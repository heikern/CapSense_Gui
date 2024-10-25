const ResultsWindow = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Simulation results</h3>
      <p className="text-gray-700 mb-4">This is a description of the simulation results</p>
        <div className="bg-gray-100 p-2 rounded-md">
            <h4 className="text-lg font-medium">Additional Information:</h4>
            <p className="text-gray-600">Some additional information</p>
        </div>
    </div>
  );
};

export default ResultsWindow;

