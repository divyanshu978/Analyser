// "'use client';"

// import { Button } from "@/components/ui/button";
// import { Box, Cross } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import React from "react";
// import { Globe, Search } from "lucide-react";
// import { Progress } from "@/components/ui/progress"
// import { TriangleAlert } from "lucide-react";

// export default function UrlBox() {
//   const [url, setURL] = useState("");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [totalChecks, setTotalChecks] = useState(0);
//   const [passes, setpasses] = useState(0);
//   const [violations, setvoilations] = useState(0);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     data && setData(null); // Clear previous data

//     if (!url.trim()) {
//       alert("Please paste your URL before analyzing.");
//       return;
//     }

//     let urlToSend = url.trim();

//     if (!/^https?:\/\//i.test(urlToSend)) {
//       urlToSend = "http://" + urlToSend;
//     }
//     setLoading(true);

//     try {
//       const res = await fetch("/api/analyseURL", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: urlToSend }),
//       });

//       const data = await res.json();

//       setData(data);
//       console.log("Response from API:", data);

//       setTotalChecks(data.violations.length + data.passes.length);
//       setpasses(data.passes.length);
//       setvoilations(data.violations.length);


//     } catch (err) {
//       console.error("Error during fetch:", err);
//     } finally {
//       setLoading(false);
//       setURL("");
//     }

//   };



//   return (
//     <div>


//       <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-gray-900/30">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-3 bg-gray-700 rounded-xl border border-gray-600">
//             <Globe className="w-6 h-6 text-gray-200" />
//           </div>
//           <h2 className="text-2xl font-bold text-white">URL Analysis</h2>
//         </div>

//         <div className="space-y-6">
//           <div className="relative">
//             <input
//               type="url"
//               placeholder="Enter website URL (e.g., https://example.com)"
//               value={url}
//               onChange={(e) => setURL(e.target.value)}
//               className=" w-full bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg rounded-xl pl-12 focus:border-gray-400 focus:ring-gray-400/20 transition-all duration-300"
//             />
//             <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           </div>

//           <Button
//             className="w-full h-14 text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 border border-gray-600 hover:border-gray-500"
//             disabled={!url.trim()}
//             onClick={handleSubmit}
//           >
//             <Search className="w-5 h-5 mr-2" />
//             Analyze Accessibility
//           </Button>
//         </div>
//       </div>



//       {
//         loading && (
//           <div className="flex items-center justify-center mt-4">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-200"></div>
//           </div>
//         )}

//       {data && (
//        <>
//   <div className="mt-6 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
//     <h2 className="text-4xl font-bold mb-6 text-center text-amber-300">
//       Accessibility Report
//     </h2>

//     {data.violations?.length > 0 ? (
//       <>
//         {/* Score Summary */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow">
//           <div className="flex flex-col gap-4 items-center">
//             <div className="flex gap-2 items-center text-2xl">
//               <span>Accessibility Score:</span>
//               <span className="text-green-400 font-bold">
//                 {(passes * 100 / totalChecks).toFixed(2)}%
//               </span>
//             </div>
//             <Progress
//               value={(passes * 100 / totalChecks).toFixed(2)}
//               className="w-2/3 bg-amber-400 h-3 rounded"
//             />
//           </div>

//           {/* Passes & Violations */}
//           <div className="mt-6 grid grid-cols-2 gap-6 text-center">
//             <div className="bg-green-700/20 p-4 rounded-lg">
//               <h1 className="text-xl font-medium">Passes</h1>
//               <p className="text-green-400 text-3xl font-bold">{passes}</p>
//             </div>
//             <div className="bg-red-700/20 p-4 rounded-lg">
//               <h1 className="text-xl font-medium">Violations</h1>
//               <p className="text-red-400 text-3xl font-bold">{violations}</p>
//             </div>
//           </div>
//         </div>

//         {/* Violation Summary Boxes */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

//           {[
//             { label: "Critical", bgColor: "bg-red-500/20", textColor: "text-red-500", impact: "critical" },
//             { label: "Serious", bgColor: "bg-yellow-500/20", textColor: "text-yellow-500", impact: "serious" },
//             { label: "Moderate", bgColor: "bg-green-500/20", textColor: "text-green-500", impact: "moderate" },
//             { label: "Minor", bgColor: "bg-blue-500/20", textColor: "text-blue-500", impact: "minor" },
//           ].map(({ label, bgColor, textColor, impact }) => (
//             <div
//               key={impact}
//               className={`${bgColor} rounded-lg p-5 text-center`}
//             >
//               <TriangleAlert className={`w-10 h-10 ${textColor} mx-auto mb-2`} />
//               <h1 className="text-xl font-semibold">{label}</h1>
//               <p className="text-2xl font-bold">
//                 {data.violations.filter(v => v.impact === impact).length}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Detailed Violations */}

//         <div className="space-y-6 bg-gray-800/50 rounded-xl p-3 shadow-md border border-gray-700">
//           <h1 className="text-3xl font-bold mb-4 text-center my-4">Detailed Violations</h1>
//            {data.violations.map((violation, i) => (
//           <div
//             key={i}
//             className="mb-6 bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700"
//           >

           
//             <h3 className="text-2xl font-bold mb-2 capitalize text-amber-300">
//               {violation.id}
//             </h3>
//             <p className="text-lg mb-2">Description: {violation.description}</p>

//             <Link
//               className="text-blue-400 hover:underline hover:text-blue-300 transition"
//               href={violation.helpUrl}
//             >
//               🔗 Help: {violation.helpUrl}
//             </Link>

//             <div className="mt-4 text-lg font-semibold italic flex items-center gap-2">
//               <span>Impact:</span>
//               {violation.impact === "critical" ? (
//                 <span className="text-red-400">⚠️ Critical</span>
//               ) : violation.impact === "serious" ? (
//                 <span className="text-orange-400">⚠️ Serious</span>
//               ) : violation.impact === "moderate" ? (
//                 <span className="text-yellow-400">ℹ️ Moderate</span>
//               ) : (
//                 <span className="text-green-400">ℹ️ Minor</span>
//               )}
//             </div>

//             <ul className="list-disc pl-6 mt-4 text-yellow-300">
//               {violation.nodes.map((node, j) => (
//                 <li key={j}>
//                   <code>{node.html}</code>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         </div>
        
       
//       </>
//     ) : (
//       <h3 className="text-green-400 text-2xl text-center mt-4">
//         No accessibility violations found!
//       </h3>
//     )}
//   </div>
// </>

//       )}

//     </div>
//   );
// }


'use client';

import { Button } from "@/components/ui/button";
import { Box, Cross, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { Globe, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import { TriangleAlert } from "lucide-react";
import  {useAuth}  from "@/hooks/useAuth";
import { saveViolationFromUrl } from "@/lib/database";

export default function UrlBox() {
  const { user, loading: authLoading } = useAuth();
  const [url, setURL] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [totalChecks, setTotalChecks] = useState(0);
  const [passes, setpasses] = useState(0);
  const [violations, setvoilations] = useState(0);
  const [lastAnalyzedUrl, setLastAnalyzedUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    data && setData(null); // Clear previous data

    if (!url.trim()) {
      alert("Please paste your URL before analyzing.");
      return;
    }

    let urlToSend = url.trim();

    if (!/^https?:\/\//i.test(urlToSend)) {
      urlToSend = "http://" + urlToSend;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/analyseURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToSend }),
      });

      const analysisData = await res.json();

      setData(analysisData);
      setLastAnalyzedUrl(urlToSend);
      console.log("Response from API:", analysisData);

      setTotalChecks(analysisData.violations.length + analysisData.passes.length);
      setpasses(analysisData.passes.length);
      setvoilations(analysisData.violations.length);

    } catch (err) {
      console.error("Error during fetch:", err);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
      setURL("");
    }
  };

  const handleSaveReport = async () => {
    if (!user) {
      alert("Please log in to save your report.");
      return;
    }

    if (!data || !lastAnalyzedUrl) {
      alert("No analysis data to save. Please analyze a URL first.");
      return;
    }

    setSaving(true);
    try {
      await saveViolationFromUrl(user.id, lastAnalyzedUrl, data);
      alert("Report saved successfully!");
    } catch (error) {
      console.error("Failed to save report:", error);
      alert("Failed to save report. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Authentication Status */}
      {!authLoading && (
        <div className="mb-4 p-4 rounded-lg">
          {user ? (
            <div className="bg-green-100 border border-green-400 p-3 rounded">
              <p className="text-green-800">✅ Logged in as: <strong>{user.email}</strong></p>
              <p className="text-green-700">You can save your analysis reports!</p>
            </div>
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 p-3 rounded">
              <p className="text-yellow-800">🔍 Analysis available to everyone</p>
              <p className="text-yellow-700">💾 <Link href="/login" className="text-blue-600 underline">Login</Link> to save reports</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 shadow-2xl shadow-gray-900/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-700 rounded-xl border border-gray-600">
            <Globe className="w-6 h-6 text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold text-white">URL Analysis</h2>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className="w-full bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg rounded-xl pl-12 focus:border-gray-400 focus:ring-gray-400/20 transition-all duration-300"
            />
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <Button
            className="w-full h-14 text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 border border-gray-600 hover:border-gray-500"
            disabled={!url.trim() || loading}
            onClick={handleSubmit}
          >
            <Search className="w-5 h-5 mr-2" />
            {loading ? 'Analyzing...' : 'Analyze Accessibility'}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      )}

      {data && (
        <>
          <div className="mt-6 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-amber-300">
                Accessibility Report
              </h2>
              
              {/* Save Button - Only show if user is logged in */}
              {user && (
                <Button
                  onClick={handleSaveReport}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Report'}
                </Button>
              )}
            </div>

            {data.violations?.length > 0 ? (
              <>
                {/* Score Summary */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow">
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex gap-2 items-center text-2xl">
                      <span>Accessibility Score:</span>
                      <span className="text-green-400 font-bold">
                        {(passes * 100 / totalChecks).toFixed(2)}%
                      </span>
                    </div>
                    <Progress
                      value={(passes * 100 / totalChecks).toFixed(2)}
                      className="w-2/3 bg-amber-400 h-3 rounded"
                    />
                  </div>

                  {/* Passes & Violations */}
                  <div className="mt-6 grid grid-cols-2 gap-6 text-center">
                    <div className="bg-green-700/20 p-4 rounded-lg">
                      <h1 className="text-xl font-medium">Passes</h1>
                      <p className="text-green-400 text-3xl font-bold">{passes}</p>
                    </div>
                    <div className="bg-red-700/20 p-4 rounded-lg">
                      <h1 className="text-xl font-medium">Violations</h1>
                      <p className="text-red-400 text-3xl font-bold">{violations}</p>
                    </div>
                  </div>
                </div>

                {/* Violation Summary Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Critical", bgColor: "bg-red-500/20", textColor: "text-red-500", impact: "critical" },
                    { label: "Serious", bgColor: "bg-yellow-500/20", textColor: "text-yellow-500", impact: "serious" },
                    { label: "Moderate", bgColor: "bg-green-500/20", textColor: "text-green-500", impact: "moderate" },
                    { label: "Minor", bgColor: "bg-blue-500/20", textColor: "text-blue-500", impact: "minor" },
                  ].map(({ label, bgColor, textColor, impact }) => (
                    <div
                      key={impact}
                      className={`${bgColor} rounded-lg p-5 text-center`}
                    >
                      <TriangleAlert className={`w-10 h-10 ${textColor} mx-auto mb-2`} />
                      <h1 className="text-xl font-semibold">{label}</h1>
                      <p className="text-2xl font-bold">
                        {data.violations.filter(v => v.impact === impact).length}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Detailed Violations */}
                <div className="space-y-6 bg-gray-800/50 rounded-xl p-3 shadow-md border border-gray-700">
                  <h1 className="text-3xl font-bold mb-4 text-center my-4">Detailed Violations</h1>
                  {data.violations.map((violation, i) => (
                    <div
                      key={i}
                      className="mb-6 bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700"
                    >
                      <h3 className="text-2xl font-bold mb-2 capitalize text-amber-300">
                        {violation.id}
                      </h3>
                      <p className="text-lg mb-2">Description: {violation.description}</p>

                      <Link
                        className="text-blue-400 hover:underline hover:text-blue-300 transition"
                        href={violation.helpUrl}
                      >
                        🔗 Help: {violation.helpUrl}
                      </Link>

                      <div className="mt-4 text-lg font-semibold italic flex items-center gap-2">
                        <span>Impact:</span>
                        {violation.impact === "critical" ? (
                          <span className="text-red-400">⚠️ Critical</span>
                        ) : violation.impact === "serious" ? (
                          <span className="text-orange-400">⚠️ Serious</span>
                        ) : violation.impact === "moderate" ? (
                          <span className="text-yellow-400">ℹ️ Moderate</span>
                        ) : (
                          <span className="text-green-400">ℹ️ Minor</span>
                        )}
                      </div>

                      <ul className="list-disc pl-6 mt-4 text-yellow-300">
                        {violation.nodes.map((node, j) => (
                          <li key={j}>
                            <code>{node.html}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h3 className="text-green-400 text-2xl text-center mt-4">
                No accessibility violations found!
              </h3>
            )}
          </div>
        </>
      )}
    </div>
  );
}
