import React from "react";

export default function AdminControls({ onGrantPremium }) {
  return (
    <div className="my-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Admin Tools</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const plan = e.target.plan.value;
          onGrantPremium(email, plan);
        }}
      >
        <input name="email" type="email" placeholder="User Email" required className="border p-2 mr-2" />
        <select name="plan" className="border p-2 mr-2">
          <option value="1month">1 Month</option>
          <option value="3month">3 Months</option>
          <option value="6month">6 Months</option>
          <option value="1year">1 Year</option>
          <option value="permanent">Permanent</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded">
          Grant Premium
        </button>
      </form>
    </div>
  );
}
