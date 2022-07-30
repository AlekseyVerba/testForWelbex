import Loader from "../BigLoader"
import InfiniteScroll from "react-infinite-scroll-component"
import { IEntry } from "../../types/entry.interface"
import Entry from "../Entry"
import "./index.scss"

interface IProps {
    loading: boolean
    isMore: boolean
    items: IEntry[]
    getNewItems: () => void
}

const EntriesList: React.FC<IProps> = ({getNewItems, isMore, items, loading}) => {

    return (
        <div className="entries__list">
            {
                loading ?
                    <div style={{textAlign: "center"}}>
                        <Loader />
                    </div>
                    :
                    <>
                        {
                            items.length !== 0 ?
                                <InfiniteScroll
                                    dataLength={items.length}
                                    hasMore={isMore}
                                    loader={ <div style={{textAlign: "center"}}>
                                                <Loader />
                                            </div>}
                                    next={getNewItems}
                                >
                                    {
                                        items.map(item => {
                                            return <Entry key={item.id} {...item} />
                                        })
                                    }
                                </InfiniteScroll>
                                :
                                <h1>Постов не найдено</h1>
                        }
                    </>
            }
        </div>
    )
}

export default EntriesList