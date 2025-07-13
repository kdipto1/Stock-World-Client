import found from '../../Images/Utility/found.png';
const NotFound = () => {
  return (
    <section className='container mx-auto'>
      <div className=''>
        <h2 className="text-center font-bold text-4xl my-4">Page Not Found</h2>
        <img className="w-fit mx-auto" src={found} alt="page not found" />
      </div>
    </section>
  );
};

export default NotFound;