export default function Loader() {
  return (
   <section>
    <div></div>
   </section>
  )
}


export const Skeleton= ({
  width = "unset"
}) => {
  return <div className="skeleton-loader">
    <div className="skeleton-shape" style={{
      width
    }} ></div>
    <div className="skeleton-shape" ></div>
    <div className="skeleton-shape" ></div>
  </div>
}