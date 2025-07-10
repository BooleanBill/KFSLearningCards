import { useState } from 'react';

export default function PatchNotesModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <button
        className='text-xs text-secondary hover:text-secondary-content hover:animate-none animate-bounce transition-all duration-300' cursor-pointer
        onClick={() => setModalVisible(true)}
      >
        Patchnotes!
      </button>
      <dialog id='my_modal_1' className='modal' open={modalVisible}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Version 1.69.420</h3>

          <p>Basti kann mich mal!</p>

          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn' onClick={() => setModalVisible(false)}>
                Schließen
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
