import type { ReactNode } from "react";

type FormContainerProps = {
  children: ReactNode;
};

const FormContainer = (props: FormContainerProps) => {
  const { children } = props;
  return (
    <div className="flex">
      <div className="relative hidden md:flex">
        <img
          className="object-cover h-screen"
          src="Trask_ulgo.jpg"
          alt="The real hero of KOTOR."
        />
        <div className="absolute top-0 left-0 w-full h-full bg-orange-900/8"></div>
      </div>
      <div className="flex flex-col h-screen items-center justify-center bg-orange-900 flex-1">
        <div className="flex flex-col items-center mx-2 my-8">
          <img className="w-16 mb-2" src="mug-logo.png" alt="" />
          <div className="font-lobster text-2xl text-yellow-300/70 font-bold">
            Task Ulgo
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default FormContainer;
