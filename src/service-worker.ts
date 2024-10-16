/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { onBackgroundMessage } from 'firebase/messaging/sw'
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { messaging } from './firebase-messaging-sw'

declare const self: ServiceWorkerGlobalScope

clientsClaim()

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST)

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')

registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    }

    // Return true to signal that we want to use the handler.
    return true
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
)

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 })
    ]
  })
)

//이미지 캐싱
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 7 * 24 * 60 * 60 })] //7일
  })
)

// CSS, JS, 이미지 파일 캐싱
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
)

// fetch requests 캐싱
registerRoute(
  ({ request }) => request.mode === 'cors' || request.mode === 'no-cors',
  new NetworkFirst({
    //최신 데이터를 우선 제공, 네트워크 연결이 없을 때 캐싱데이터 제공
    cacheName: 'api-responses',
    networkTimeoutSeconds: 10,
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 5 * 60 })]
  })
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

const assetsCache = 'assetsCache'
const contentToCache = [
  '/index.html',
  '/',
  'logo.webp',
  'banner.webp',
  'no-image.webp',
  'login_img.webp',
  'push_icon.webp',
  'skeleton_image.webp'
]

self.addEventListener('install', (event) => {
  // 지정된 에셋 캐싱
  event.waitUntil(
    caches.open(assetsCache).then((cache) => {
      return cache.addAll(contentToCache)
    })
  )
})

self.addEventListener('activate', (event) => {
  // 불필요한 캐시 삭제
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (assetsCache.indexOf(key) === -1) {
            return caches.delete(key)
          }
          return []
        })
      )
    })
  )
})

// 네트워크 오프라인일 때 캐싱된 데이터 제공
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('chrome-extension')) return

  event.respondWith(
    //네트워크 우선
    fetch(event.request)
      .then(async (response) => {
        const responseClone = response.clone()
        const cache = await caches.open(assetsCache)
        console.log('서비스워커가 새로운 리소스를 캐싱합니다.' + event.request.url)
        cache.put(event.request, responseClone) //응답 저장
        return response
      })
      .catch(async () => {
        const response = await caches.match(event.request)
        if (response) return response
        if (event.request.mode === 'navigate') {
          // 캐시된 응답이 없고 네비게이션 요청인 경우
          return caches.match('index.html').then((indexResponse) => {
            return (
              indexResponse ||
              new Response('오프라인페이지를 사용할 수 없습니다.', {
                status: 404,
                statusText: 'Not Found'
              })
            )
          })
        }
        return new Response('오프라인 상태입니다.', {
          status: 503,
          statusText: '서비스를 사용할 수 없습니다.'
        })
      })
  )
})

onBackgroundMessage(messaging, (payload) => {
  if (!payload.data) return

  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body
  }

  self.registration.showNotification(notificationTitle, {
    body: notificationOptions.body
  })
})
