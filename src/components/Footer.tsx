export default function Footer() {
  return (
    <div className="text-white bg-gray-950/50 text-center flex flex-col gap-2 mt-10 w-fit self-center px-8 py-4 rounded-md">
      <p className="text-2xl">Ready to plan smarter?</p>
      <p>Join thousands of travellers who pack better with Voyage.</p>
      <button className="px-3 w-fit self-center py-1 text-sm bg-gray-950/70 hover:cursor-pointer hover:bg-gray-950/50 transition-all duration-400 rounded-sm">
        Create a free account
      </button>
    </div>
  );
}
