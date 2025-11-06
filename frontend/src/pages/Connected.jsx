import { Link } from "react-router-dom";

function Connected() {

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    console.log(name);

  return (
    <>
      <div className={`w-full h-screen bg-linear-to-br from-teal-700 to-green-800 flex flex-col justify-center items-center gap-2`}>
        <p className={`w-full text-lg md:text-xl lg:text-2xl text-center font-Montserrat text-white`}>Connected with :</p>
        <h1 className={`w-full text-center text-2xl md:text-3xl lg:text-5xl font-Montserrat text-white capitalize font-semibold`}>{name} 🎉</h1>
        <Link to='/' className={`w-auto text-sm px-4 mt-2 py-2 rounded-full bg-white cursor-pointer active:scale-95 duration-150 ease-in-out text-center font-Montserrat text-black`}>Go Back</Link>
      </div>
    </>
  )
}

export default Connected
