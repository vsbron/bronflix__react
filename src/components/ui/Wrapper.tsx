import { WrapperProps } from "@/lib/types";

function Wrapper({ children }: WrapperProps) {
  // Returned JSX
  return (
    <div
      className={
        "flex flex-col gap-6 sm:gap-10 pl-6 md:pl-0 pr-6 md:pr-12 mt-[4.5rem] md:mt-0"
      }
    >
      {children}
    </div>
  );
}

export default Wrapper;
