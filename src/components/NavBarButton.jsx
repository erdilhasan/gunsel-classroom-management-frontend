/* eslint-disable react/prop-types */
export default function NavBarButton(props) {
  const title = props.title;
  const sectionId = props.sectionId;
  return (
    <button
      className="px-5 hover:outline rounded-md"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({
          top: document.querySelector(sectionId).offsetTop,
          behavior: "smooth",
        });
      }}
    >
      {title}
    </button>
  );
}
