import SchematicComponent from "@/components/schematic/SchematicComponent";

function ManagePlan() {
  return (
    <div className="container mx-auto md:mt-25 sm:mt-10 p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-4 my-8">Manage Plan</h1>
      <p className="text-gray-600 mb-8">
        Manage your subscription and billing details here.
      </p>

      <SchematicComponent componentId="cmpn_Z5tANUnQRau" />
    </div>
  );
}

export default ManagePlan;
