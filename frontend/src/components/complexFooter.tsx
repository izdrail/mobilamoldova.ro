const navigationItems = [
  ['Despre', '/despre-noi'],
  ['Magazin', '/magazin'],
  ['Living', '/categorie/mobila-living'],
  ['Dormitor', '/categorie/mobila-dormitor'],
  ['Bucatarie', '/categorie/mobila-de-bucatarie'],
  ['Copii', '/categorie/mobila-copii'],
  ['Paturi', '/categorie/paturi'],
  ['Birouri', '/categorie/birouri'],
  ['Recicleaza', '/recicleaza'],
  ['Contact', '/contact']
];

export default function ComplexFooter() {
  return (
    <>
      <footer className="bg-yellow-50 dark:bg-gray-800">
        <div className="lg:-10 mx-auto max-w-screen-xl p-4 py-6 md:p-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2">
              <a href="#" className="mb-2 flex items-center text-2xl font-semibold text-gray-900 dark:text-white sm:mb-0">
                Mobila Moldova
              </a>
              <p className="my-4 text-gray-500 dark:text-gray-400">
                Fabrică de <b>mobilă la comandă în Barlad</b>, vinde din stoc sau la comandă, mobilă bucătărie, mobilă dormitor, mobilă living, paturi tapițate și canapele.</p>
              
              <img src="anpc.png" />
              <ul className="mt-5 flex space-x-6">
                {/* ... social media links ... */}
              </ul>
            </div>
            <div className="lg:mx-auto">
              <ul className="text-gray-500 dark:text-gray-400">
                {navigationItems.slice(0, 3).map(([label, path]) => (
                  <li key={path} className="mb-4">
                    <a href={path} className="hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:mx-auto">
              <ul className="text-gray-500 dark:text-gray-400">
                {navigationItems.slice(3, 6).map(([label, path]) => (
                  <li key={path} className="mb-4">
                    <a href={path} className="hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:mx-auto">
              <ul className="text-gray-500 dark:text-gray-400">
                {navigationItems.slice(6).map(([label, path]) => (
                  <li key={path} className="mb-4">
                    <a href={path} className="hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"/>
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400"> 2021-2022 <a href="https://laravelcompany.com" className="hover:underline">Laravel Agency</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}