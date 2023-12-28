interface ConfirmationModalProps {
  modalTitle: string;
  modalText: string;
  showModal: boolean;
  setShowModal: (input: boolean) => void;
  confirmAction: () => void;
}

export function ConfirmationModal({
  modalTitle,
  modalText,
  showModal,
  setShowModal,
  confirmAction,
}: ConfirmationModalProps) {
  if (!showModal) return null;

  const handleConfirmAction = () => {
    confirmAction();
    setShowModal(false);
  };

  return (
    <>
      <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
            {/*header*/}
            <div class="flex items-start justify-between p-5 border-b border-solid border-neutral-700 rounded-t">
              <h3 class="text-3xl font-semibold text-neutral-100">
                {modalTitle}
              </h3>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div class="relative p-6 flex-auto">
              <p class="my-4 text-neutral-100 text-lg leading-relaxed">
                {modalText}
              </p>
            </div>
            {/*footer*/}
            <div class="flex items-center justify-end p-6 border-t border-solid border-neutral-700 rounded-b">
              <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleConfirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
