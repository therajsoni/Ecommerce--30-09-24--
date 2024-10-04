export default function Loader() {
  return (
   <section>
    <div>Loading</div>
   </section>
  )
}


export const Skeleton= ({
  width = "unset", length =3
}) => {
  const skeletions =  Array.from({
    length
  }, (v,idx) =>    <div key={idx} className="skeleton-shape" ></div> )
  return <div className="skeleton-loader">
{skeletions}
  </div>
}