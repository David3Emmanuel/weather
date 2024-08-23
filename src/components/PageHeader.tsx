import { useAppContext } from '../appContext';
import { Page } from '../types';
import './PageHeader.css';

export default function PageHeader({ title }: { title: string }) {
    const { setCurrentPage } = useAppContext();

    return <div className='page-header'>
        <span className="material-symbols-outlined" onClick={() => setCurrentPage(Page.MAP)}>arrow_back</span>
        <h2>{title}</h2>
    </div>
}