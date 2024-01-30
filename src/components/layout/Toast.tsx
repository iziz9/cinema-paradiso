import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AUTO_CLOSE = 1500

export const notify = ({ type, text }: { type: string; text: string }) => {
  switch (type) {
    case 'default':
      toast(text)
      break
    case 'success':
      toast.success(text)
      break
    case 'warning':
      toast.warning(text)
      break
    case 'error':
      toast.error(text)
      break
  }
}

const Toast = () => {
  return (
    <ToastContainer position="bottom-center" closeOnClick draggable pauseOnHover autoClose={AUTO_CLOSE} limit={1} />
  )
}

export default Toast
