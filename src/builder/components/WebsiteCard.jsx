// export default function WebsiteCard({ title, status }) {
//   return (
//     <div className="bg-white rounded-xl border hover:shadow-lg transition p-5">
//       <div className="h-32 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 mb-4" />

//       <h3 className="text-lg font-semibold text-gray-800">
//         {title}
//       </h3>

//       <p className="text-sm text-gray-500 mb-4">
//         Status:{" "}
//         <span className={status === "Published" ? "text-green-600" : "text-orange-500"}>
//           {status}
//         </span>
//       </p>

//       <div className="flex gap-2">
//         <button className="flex-1 text-sm border rounded-lg py-2 hover:bg-gray-50">
//           Select
//         </button>
//         <button className="flex-1 text-sm border rounded-lg py-2 hover:bg-gray-50">
//           Preview
//         </button>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function WebsiteCard({ title, status, id }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-2xl p-5 bg-white">
      <div className="h-32 rounded-xl bg-indigo-100 mb-4" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-sm text-gray-600 mb-4">
        Status:{" "}
        <span className={status === "Published" ? "text-green-600" : "text-orange-500"}>
          {status}
        </span>
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/editor`)}
          className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50"
        >
          Select
        </button>

        <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
          Preview
        </button>
      </div>
    </div>
  );
}
