import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen?: boolean;
  title: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  denyLabel?: string;
  onClose(): void;
  onConfirm(): void;
}

export default function Modal({
  isOpen,
  title,
  children,
  confirmLabel = "OK",
  denyLabel = "Close",
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {children && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{children}</p>
                  </div>
                )}

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    className="mr-2 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                    onClick={onClose}
                  >
                    {denyLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
