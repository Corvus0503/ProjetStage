import React, { useEffect } from 'react'
import LogoMinister from '../../images/LogoMinister';
import { Card } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';


const PrevisionPrint = () => {
    const handlePrint = () => {
        const printContent = document.getElementById('impression');
        if (printContent) {
            const originalContent = document.body.innerHTML;
            const contentToPrint = printContent.innerHTML;

            document.body.innerHTML = contentToPrint;
            window.print();
            document.body.innerHTML = originalContent;
        }
    };
    useEffect(() => {
        // Écouter l'événement d'impression et rétablir le contenu après l'impression
        window.addEventListener('afterprint', restoreContent);

        return () => {
            window.removeEventListener('afterprint', restoreContent);
        };
    }, []);

    const restoreContent = () => {
        window.location.reload(); // Recharge la page pour restaurer le contenu original
    };
    return (
        <Card className='container-fluide shadow ms-2 me-2'>
            <div>
                
                <div className='ms-5 me-5 text-start' id='impression' >
                    <div className='text-center'>
                        <LogoMinister/>
                    </div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
                    numquam nesciunt dolores tenetur nulla! Ea tempore provident quidem vitae 
                    temporibus exercitationem sit vero quam quo praesentium laboriosam, eius commodi mollitia.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt consectetur perferendis 
                    veniam sit corporis nam esse enim fugiat suscipit, autem consequatur facilis praesentium recusandae, magni culpa accusamus, odio ea.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis ab temporibus placeat ratione
                    accusantium provident. Voluptas, iste. Tempore id officia, distinctio eos laborum eum sit ad assumenda ratione veniam alias?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quaerat atque sapiente ad possimus. Aliquid, 
                    commodi quasi? Harum, quasi nisi quisquam, ipsum quaerat facilis itaque, in nulla excepturi eveniet expedita.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita vel nam molestias laudantium illo quas deleniti ullam
                    ut magni veritatis repudiandae amet sapiente inventore eum animi, voluptatibus harum excepturi voluptas.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repellendus eveniet totam? Repudiandae fugit
                    molestiae maiores vitae qui dignissimos eveniet animi dolores accusamus exercitationem, repellat reiciendis distinctio adipisci unde numquam?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, impedit obcaecati voluptas commodi quibusdam
                    ad! Vitae animi, quod ducimus saepe aspernatur ex inventore quae molestias maiores adipisci dolorem quam atque!
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aperiam dolor est porro pariatur 
                    consequatur veritatis natus, modi veniam velit expedita debitis amet, optio eum quasi molestias ullam, dolores reprehenderit.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, deserunt maxime, ex, voluptatibus
                    cupiditate fugiat hic fuga dolore accusamus similique laboriosam ipsam a tenetur illum optio. Rem sunt nemo ad.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem dignissimos at nobis culpa fuga explicabo, 
                    delectus quaerat voluptatibus, porro perspiciatis eius illo voluptates ut nostrum corporis beatae alias provident suscipit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam officiis reprehenderit voluptate laborum magni
                    eligendi inventore voluptates veniam dignissimos. Cupiditate itaque porro quas ipsam commodi dolorem alias ullam assumenda eveniet.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae labore magnam eos? Illum atque itaque molestias, 
                    quo, tempora deserunt nihil eaque repellendus sapiente accusantium ea! Eius nobis fugit a consectetur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel obcaecati eveniet veniam ad? Ut deleniti
                     sequi incidunt fugiat blanditiis excepturi, rerum architecto nisi molestias nam eveniet nesciunt, asperiores voluptatibus totam.
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dignissimos omnis, nulla commodi neque dolore vitae non, 
                     dolorum sequi tenetur ipsa eius quam mollitia facere perspiciatis error. Neque, minus ipsa?
                </div>
            </div>
            <div className='text-start ms-5 mt-3 mb-3 '>
                <button className='btn btn-success' onClick={handlePrint}>
                    <PrintIcon/> Imprimer                
                </button>
            </div>
        </Card>
    )
}

export default PrevisionPrint;