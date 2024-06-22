
import emptyData from "../../../public/images/lottie/emptyData.json"
import Lottie from "lottie-react"

// a lottie anmation placeholder for empty pages or tables

type animation = 
{animationData?:any,
  errorMessage?:string,
  
}
const EmptyPageLottie = ({animationData}:animation) => {
  return (
    <div className="w-full h-full flex flex-col my-2 lg:my-4 items-center justify-center">
      <Lottie animationData={animationData||emptyData} className="max-w-[300px]"  loop autoPlay/>
      <p className="font-semibold text-white text-center m-2">
        Nothing to show!
      </p>
    </div>
  )
}

export default EmptyPageLottie