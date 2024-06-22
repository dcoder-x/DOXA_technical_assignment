const Loader = () => {
  return (
    <div className="flex h-screen top-0 right-0 w-screen z-[10000] fixed items-center justify-center opacity-65 bg-white dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
