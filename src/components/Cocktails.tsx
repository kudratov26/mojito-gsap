import gsap from 'gsap'
import { cocktailLists, mockTailLists } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'

const Cocktails = () => {

    useGSAP(() => {
        const parallaxTime = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top 10%',
                end: 'bottom 70%',
                scrub: true,
            }
        })

        parallaxTime.to('#c-left-leaf', {
            x: -70, y: 10
        })
        parallaxTime.to('#c-right-leaf', {
            x: 110, y: 100
        })
    })
    return (
        <section id="cocktails" className="noisy">
            <img src="/images/cocktail-left-leaf.png" alt="left-leaf" id="c-left-leaf" />
            <img src="/images/cocktail-right-leaf.png" alt="right-leaf" id="c-right-leaf" />

            <div className="list">
                <div className="popular">
                    <h2>Most popular cocktails:</h2>
                    <ul>
                        {cocktailLists.map(({ name, country, detail, price }) => (
                            <li key={name}>
                                <div className='md:me-28'>
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span> - {price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="loved">
                    <h2>Most loved mocktails:</h2>
                    <ul>
                        {mockTailLists.map(({ name, country, detail, price }) => (
                            <li key={name}>
                                <div className='me-28'>
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span> - {price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Cocktails