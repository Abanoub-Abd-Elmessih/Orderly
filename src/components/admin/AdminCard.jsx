export const AdminCard = ({ title, total, icon }) => {
  const cardColor = total > 5 ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`border-2 shadow-lg ${cardColor} col-span-6 text-white text-xl p-5 rounded-lg transition-transform transform`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <p className="font-bold">{title}</p>
      </div>
      <p className="mt-3">
        Total {title}: <span className="font-semibold text-xl">{total}</span>
      </p>
    </div>
  );
};
