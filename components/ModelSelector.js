export default function ModelSelector({ model, setModel, isPremium }) {
  return (
    <div className="w-full px-4 py-2 border-b border-gray-800 bg-gray-900 text-sm text-white flex items-center gap-2">
      <label htmlFor="model">Model:</label>
      <select
        id="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="bg-gray-800 p-2 rounded text-white"
      >
        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        {isPremium && <option value="gpt-4">GPT-4</option>}
        {isPremium && <option value="gpt-4-turbo">GPT-4 Turbo</option>}
      </select>
    </div>
  );
}
