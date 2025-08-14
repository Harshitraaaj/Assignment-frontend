import AadhaarForm from "../Components/AadhaarForm"

export default function Home() {
  return (
    <>
      <div className="w-full bg-gray-200 p-4">
        <h1 className="text-2xl md:text-xl font-semibold text-center text-indigo-900 mx-auto max-w-4xl">
          UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
        </h1>
      </div>
      <AadhaarForm />
    </>
  );
}
