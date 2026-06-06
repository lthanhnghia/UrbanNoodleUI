import { Oval } from "react-loader-spinner";

type Props = {
  show?: boolean;
};

const Loading = ({ show = false }: Props) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50 z-[9999]">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
export default Loading;