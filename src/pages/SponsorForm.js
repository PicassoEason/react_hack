import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ServiceButtons from '../components/ServiceButtons';

const SponsorForm = () => {
  const [sponsors, setSponsors] = useState([]);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const watchSponsor = watch("sponsor");

  useEffect(() => {
    fetch('https://hack-bdend.vercel.app/api/sponsor')
      .then(response => response.json())
      .then(data => setSponsors(data))
      .catch(error => console.error('Error fetching sponsors:', error));
  }, []);

  useEffect(() => {
    if (watchSponsor) {
      const selectedSponsor = sponsors.find(s => s.id === watchSponsor);
      if (selectedSponsor) {
        setValue("endDate", selectedSponsor.endDate);
      }
    }
  }, [watchSponsor, sponsors, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    alert('表單提交成功，我們會盡快與您聯絡！');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md">
        <ServiceButtons />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-5">捐款表單</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2">姓名</label>
              <input 
                type="text" 
                {...register("name", { required: "請輸入姓名" })}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>  
              <label className="block mb-2">電話</label>
              <input 
                type="text" 
                {...register("phone", { required: "請輸入電話" })}
                className="w-full p-2 border rounded"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                {...register("email", { required: "請輸入Email" })}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block mb-2">選擇捐款團體</label>
              <select 
                {...register("sponsor", { required: "請選擇贊助團體" })}
                className="w-full p-2 border rounded"
              >
                <option value="">請選擇...</option>
                {sponsors.map((sponsor) => (
                  <option key={sponsor.id} value={sponsor.id}>{sponsor.勸募團體}</option>
                ))}
              </select>
              {errors.sponsor && <p className="text-red-500 text-sm mt-1">{errors.sponsor.message}</p>}
            </div>
            <div>
              <label className="block mb-2">捐款金額</label>
              <input 
                type="number" 
                {...register("amount", { required: "請輸入捐款金額", min: { value: 1, message: "金額必須大於0" } })}
                className="w-full p-2 border rounded"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
              提交捐款
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SponsorForm;