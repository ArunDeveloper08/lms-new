import React, { useRef } from "react";
const PdfContainer = (props) => {
  const ref = useRef();
  const createPdf = () => props.createPdf(ref.current);
  return (
    <>
      <section className="pdf-container mx-auto w-[ 500px]">
        <section className="pdf-body w-full" ref={ ref }>
          { props.children }
        </section>
        <section className="pdf-toolbar w-full flex justify-center">
          <button
            className="bg-green-600 text-white hover:bg-green-700 mt-2 rounded-md py-2 px-5"
            onClick={ createPdf }
          >
            Download PDF
          </button>
        </section>
      </section>
    </>
  );
};
export default PdfContainer;