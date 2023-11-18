import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full mt-10 pt-5 text-white bg-black">
      <div className="m-auto max-w-5xl h-40 text-xs p-5 justify-center relative flex flex-col gap-3">
        <a href="https://github.com/iziz9/cinema-paradiso" target="_blank" rel="noreferrer" className="px-1 flex gap-1">
          iziz9 Repository
        </a>
        <div className="flex justify-end">{/* <img src="" className="w-36 right-0" /> */}</div>
        <span className="font-semibold text-right">&copy; 2023 CINEMA PARADISO. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
