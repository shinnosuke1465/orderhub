import { Link } from '@inertiajs/react';

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    links: LinkItem[];
    searchStr: string;
}

export default function Pagination({ currentPage, lastPage, links, searchStr }: PaginationProps) {
    return (
        <nav className="flex items-center gap-x-1 mt-2 mb-2" aria-label="Pagination">
            <div className="flex items-center gap-x-1">
                {links.map((link, index) => (
                    <div key={index}>
                        {index === 0 ? (
                            <Link
                                href={route('products.index', { page: currentPage - 1, search_str: searchStr })}
                                className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                style={{ display: link.url ? 'flex' : 'none' }}
                            >
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                                <span>Previous</span>
                            </Link>
                        ) : index === lastPage + 1 ? (
                            <Link
                                href={route('products.index', { page: currentPage + 1, search_str: searchStr })}
                                className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                style={{ display: link.url ? 'flex' : 'none' }}
                            >
                                <span>Next</span>
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                href={route('products.index', { page: link.label, search_str: searchStr })}
                                className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none ${
                                    link.active
                                        ? 'bg-gray-200 text-gray-800 focus:bg-gray-300'
                                        : 'text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
                                }`}
                                style={{ display: link.url ? 'flex' : 'none' }}
                            >
                                <span>{link.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
}
