import styled from 'styled-components'
import { useNotificationStore } from '../../store/NotificationStore'
import { requestPermission } from '../../firebase-messaging-sw'

const NotificationModal = () => {
  const { permissionStatus, setPermissionStatus } = useNotificationStore()

  const setPermissionGranted = () => {
    setPermissionStatus('granted')
    requestPermission()
  }
  const setPermissionDenied = () => {
    setPermissionStatus('denied')
  }

  if (permissionStatus !== '') return <></>

  return (
    <NotiContainer>
      <NoticeSection>
        <div>
          <img src={'/push_icon.webp'} alt="웹푸시 아이콘" />
        </div>
        <div>
          <p>알림을 허용하고 이런 알림을 받아보세요.</p>
          <div className="examples">
            <span>- 취향에 맞는 영화를 추천받아보세요.</span>
            <span>- 지금 가장 인기있는 영화를 확인해보세요.</span>
            <span>- 오늘 이런 영화는 어떠세요?</span>
          </div>
        </div>
      </NoticeSection>
      <ConfirmSection>
        <button onClick={() => setPermissionDenied()}>알림 안 받기</button>
        <button onClick={() => setPermissionGranted()}>푸시알림 받기</button>
      </ConfirmSection>
    </NotiContainer>
  )
}

const NotiContainer = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: var(--colors-light);
  width: fit-content;
  border-radius: 16px;
  padding: 16px;
  margin: 20px;
  box-sizing: border-box;
`
const NoticeSection = styled.div`
  display: flex;
  margin-bottom: 16px;

  img {
    width: 64px;
    height: 64px;
    padding: 0 8px;
  }
  p {
    color: #000;
    font-weight: 700;
    margin: 4px 0;
  }

  .examples {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    line-height: 1.15rem;
    padding: 4px 0;

    span {
      color: var(--colors-dark);
    }
  }
`
const ConfirmSection = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 45%;
    height: 40px;
  }
  button:first-child {
    background-color: var(--colors-gray);
  }
  button:last-child {
    background-color: #135613;
    color: var(--colors-light);
  }
`

export default NotificationModal
