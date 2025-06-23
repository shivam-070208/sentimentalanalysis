export const Svg = ({ item }) => {
  if (item == "Student") {
    return (
      <svg
        className="text-blue-800  m-auto w-14 h-14 lucide lucide-graduation-cap mx-auto text-education-blue mb-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        
        data-lov-id="src\pages\Index.tsx:44:16"
        data-lov-name="GraduationCap"
        data-component-path="src\pages\Index.tsx"
        data-component-line="44"
        data-component-file="Index.tsx"
        data-component-name="GraduationCap"
        data-component-content="%7B%22className%22%3A%22mx-auto%20h-12%20w-12%20text-education-blue%20mb-4%22%7D"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
        <path d="M22 10v6"></path>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
      </svg>
    );
  } else {
    return (
      <svg
       
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-users mx-auto  text-education-green mb-4 text-green-700 m-auto  w-14 h-14"
        data-lov-id="src\pages\Index.tsx:67:16"
        data-lov-name="Users"
        data-component-path="src\pages\Index.tsx"
        data-component-line="67"
        data-component-file="Index.tsx"
        data-component-name="Users"
        data-component-content="%7B%22className%22%3A%22mx-auto%20h-12%20w-12%20text-education-green%20mb-4%22%7D"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    );
  }
};
