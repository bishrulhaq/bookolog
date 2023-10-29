import { fetchBooks } from "@/utils";
import Image from 'next/image';
import Carousel from "@/components/Carousel";
import GenreCarousel from "./GenreCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeaturedBooks from "@/components/HomePage/FeaturedBooks";

export default async function App({ searchParams }) {
  const books = await fetchBooks();

  return (
    <>
      <div class="lg:flex">
        <div class="lg:w-8/12 xl:w-75/100 px-2 b-shadow m-auto">
          <Breadcrumbs />
          <Carousel />
        </div>

        <div class="lg:w-4/12 xl:w-25/100 px-2 b-shadow m-auto">
          <div class="w-full h-[27rem] overflow-y-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
              Trending Books
            </h5>
    
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor.</p>
              <ul class="my-4 space-y-3">
                <li>
                  <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="inline-flex items-center justify-center px-2 py-2 mr-3 text-xs font-medium text-white bg-gradient-rosybrown rounded">#1</span>
                    <span class="flex-1 ml-3 whitespace-nowrap">lorem ipsum</span>
                    <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs  font-medium text-white bg-gradient-darkgoldenrod rounded">Popular</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="inline-flex items-center justify-center px-2 py-2 mr-3 text-xs font-medium text-white bg-gradient-rosybrown rounded">#2</span>
                    <span class="flex-1 ml-3 whitespace-nowrap">lorem ipsum</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="inline-flex items-center justify-center px-2 py-2 mr-3 text-xs font-medium text-white bg-gradient-rosybrown rounded">#3</span>
                    <span class="flex-1 ml-3 whitespace-nowrap">lorem ipsum</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span class="inline-flex items-center justify-center px-2 py-2 mr-3 text-xs font-medium text-white bg-gradient-rosybrown rounded">#4</span>
                    <span class="flex-1 ml-3 whitespace-nowrap">lorem ipsum</span>
                  </a>
                </li>

              </ul>
              <div>
                <a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark-text-gray-400">
                  <svg class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Lorem ipsum dolor sit amet,
                </a>
              </div>
            </div>

          </div>
      </div>

    
      <div className="py-2 mx-auto lg:py-2">
        <div className="text-center p-8 md:p-12 mb-8">
          <p className="bg-blue-100 text-blue-800 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
            👐🏼
          </p>
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold py-2">Get connected,</h1>
          <h2 className="text-gray-900 dark:text-white text-2xl md:text-4xl font-bold py-2">Explore, and get connected with fellow book readers!</h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.</p>
          <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Sign up
            <svg className="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <a href="#" className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
              <svg className="w-2.5 h-2.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor
            </a>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor</h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor</p>
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
              <svg className="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <a href="#" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
              <svg className="w-2.5 h-2.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
              </svg>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor
            </a>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor</h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel bibendum dolor</p>
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
              <svg className="w-3.5 h-3.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <FeaturedBooks></FeaturedBooks>

    </>
  );
}