import FormInput from "../ui/FormInput";

function Form({ form, setForm }) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  return (
    <div className="space-y-5">
      <FormInput
        name="companyName"
        label="Company Name"
        type="text"
        value={form.companyName}
        onChange={changeHandler}
      />
      
      <div>
        <label htmlFor="industry" className="label">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          value={form.industry}
          onChange={changeHandler}
          className="select"
        >
          <option value="other">Other</option>
          <option value="retail">Retail</option>
          <option value="healthcare">Healthcare</option>
          <option value="SaaS">SaaS</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="manufacturing">Manufacturing</option>
        </select>
      </div>
      
      <FormInput
        name="website"
        label="Website"
        type="url"
        value={form.website}
        onChange={changeHandler}
      />
      
      <FormInput
        name="logoUrl"
        label="Logo URL"
        type="url"
        value={form.logoUrl}
        onChange={changeHandler}
      />
      
      <div>
        <label htmlFor="tier" className="label">
          Tier
        </label>
        <select
          id="tier"
          name="tier"
          value={form.tier}
          onChange={changeHandler}
          className="select"
        >
          <option value="project-based">Project-Based</option>
          <option value="retainer">Retainer</option>
          <option value="one-time">One-Time</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="status" className="label">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={changeHandler}
          className="select"
        >
          <option value="prospect">Prospect</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <FormInput
        name="monthlyRetainerValue"
        label="Monthly Retainer Value"
        type="number"
        value={form.monthlyRetainerValue}
        onChange={changeHandler}
      />
      
      <FormInput
        name="onboardedDate"
        label="Onboarded Date"
        type="date"
        value={form.onboardedDate}
        onChange={changeHandler}
      />
      
      <div>
        <label htmlFor="notes" className="label">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={changeHandler}
          rows="4"
          className="textarea"
        />
      </div>
    </div>
  );
}

export default Form;
