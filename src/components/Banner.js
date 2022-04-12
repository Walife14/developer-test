import { useState, useRef, useEffect } from "react"

// styles
import styles from './Banner.module.css'

export default function Banner({ name, avatar_url, description, repos, searchInput, login, toggle, setToggle }) {
    const [biggestRepo, setBiggestRepo] = useState(null)
    const [allRepos, setAllRepos] = useState(null)

    const handleClickBR = () => {
        fetch(`https://api.github.com/orgs/${searchInput}/repos`)
            .then(res => res.json())
            .then(data => {
                setAllRepos(data)
                setBiggestRepo(data.sort((a, b) => a.size - b.size).pop())
            })
            
        setToggle(1)
    }

    const handleClickPR = () => {
        fetch(`https://api.github.com/orgs/${searchInput}/repos`)
        .then(res => res.json())
        .then(data => {
            setAllRepos(data)
            setBiggestRepo(data.sort((a, b) => a.size - b.size).pop())
        })

        setToggle(2)
    }

    useEffect(() => {

    }, [])

    return (
        <div className={styles.container}>
            {name ? (
                <>
                    <div className={styles.head}>
                        <img src={avatar_url} alt={`${name}'s avatar`} />
                        <div>
                            <h1>{name}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <span onClick={handleClickBR}>Click here to show their biggest repository</span>
                        <span onClick={handleClickPR}>{repos} public repositories</span>
                    </div>
                </>
            ) : (<h1>Please search for an organization</h1>)}
            {toggle === 1 && biggestRepo && (
                <div className={styles['biggest-repo-container']}>
                    <h2>{biggestRepo.full_name}</h2>
                    <p>{biggestRepo.description ? biggestRepo.description : <>No description found</>}</p>
                    <div>
                        <span>Created {biggestRepo.created_at.slice(0, 10)}</span>
                        <span>Updated {biggestRepo.updated_at.slice(0, 10)}</span>
                        <span>Size {biggestRepo.size} kilobytes</span>
                        <span>Watchers {biggestRepo.watchers}</span>
                    </div>
                    <a href={biggestRepo.svn_url} target="_blank">Click Here To Visit Repository</a>
                </div>
            )}
            {toggle === 2 && allRepos && (
                <div className={styles['repo-list-container']}>
                    <h2 onClick={() => console.log(allRepos)}>List of Repositories by {login}</h2>
                    <ol>
                        {allRepos.map(repo => (
                            <li key={repo.id}>
                                <span>{repo.full_name}</span>
                                <a href={repo.svn_url} target="_blank">Repository Link</a>

                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    )
}