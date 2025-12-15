// import img6 from '../images/img_6.jpg'
// import { FaRegCalendarAlt } from 'react-icons/fa';
// import img5 from '../images/img_5.jpg'
import { useState } from 'react';
// import DOMPurify from 'dompurify';
import { FaBars, FaTimes } from "react-icons/fa";


const About_us = () => {
    const [data4, setData4] = useState([]);
    const [featuredId, setFeaturedId] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(true);

    // const URL = "https://ahirsamajbe-gnapdbcbbzdcabc2.centralindia-01.azurewebsites.net";


    // useEffect(() => {
    //     fetch(`${URL}/api/v1/news/`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             console.log("News list:", json);
    //             setData4(json);
    //             // set default featured to first item on initial load
    //             if (!featuredId && json?.data && json.data.length > 0) {
    //                 setFeaturedId(json.data[0].id);
    //             }
    //         })
    //         .catch((err) => console.error(err));
    // }, []);
    // ...existing code...

    const Data_Main = [
        // done
        {
            id: 1,
            title: "સોરઠીયા",
            content: `
            <ul>
                <li>કરંગીયા</li>
                <li>કરમુર</li>
                <li>કોઠિયા</li>
                <li>કોટા</li>
                <li>કછોટ (કચોટ)</li>
                <li>કારેથા</li>
                <li>કુછડીયા</li>
                <li>કાંબરીયા (કાંબલીયા)</li>
                <li>કંટીલ</li>
                <li>કરમોદિયા</li>
                <li>કંડોરીયા</li>
                <li>કરસળિયા</li>
                <li>કપુરિયા</li>
                <li>કરદિયા</li>
                <li>કાલેરિયા</li>
                <li>કુકડ</li>
                <li>કાટેરીયા</li>
                <li>કોટેસ</li>
                <li>કરકોલિયા</li>
                <li>કમળિયા</li>
                <li>કલવલ</li>
                <li>કલવરિયા</li>
                <li>કોકતીયા</li>
                <li>કોયલા</li>
                <li>કારથીયા</li>
                <li>કડવડીયા</li>
                <li>કપુરા</li>
                <li>કંથલિયા</li>
                <li>કોકોટીયા</li>
                <li>કાકોટ</li>
                <li>કાકરિયા</li>
                <li>કાલોરીયા</li>
                <li>કાટેશ્રી</li>
                <li>કોબાલ</li>
                <li>કાછડ</li>
                <li>કાંબલીયા</li>
                <li>કામળીયા</li>
                <li>ખોળભાયા</li>
                <li>ખોરાચિયા</li>
                <li>ખમાય</li>
                <li>ખોખડા</li>
                <li>ખુખર</li>
                <li>ખીમોજીયા</li>
                <li>ખાખશીયા</li>
                <li>ખુગલા</li>
                <li>ખુમર</li>
                <li>ખેરડ</li>
                <li>ખરડા</li>
                <li>ખુમરા</li>
                <li>ખાખરીયા</li>
                <li>ખોચ</li>
                <li>ખોલા</li>
                <li>ખોમાણીયા</li>
                <li>ખરપઠીયા</li>
                <li>ખોલેરી</li>
                <li>ખેરીયા</li>
                <li>ખુટી</li>
                <li>ખરબડીયા</li>
                <li>ખોખરીયા</li>
                <li>ખીશોટીયા</li>
                <li>ખટારીયા</li>
                <li>ખરભડા</li>
                <li>ખોરેચા</li>
                <li>ખોખારીયા</li>
                <li>ખુભરા</li>
                <li>ખેટ</li>
                <li>ખોમટા</li>
                <li>ખુમટીયા</li>
                <li>ગાગીયા</li>
                <li>ગોરીયા</li>
                <li>ગાગલીયા</li>
                <li>ગોધમ</li>
                <li>ગળ (ગલ)</li>
                <li>ગરેણીયા</li>
                <li>ગોજીયા</li>
                <li>ગુથડીયા</li>
                <li>ગરમડા</li>
                <li>ગુગડીયા</li>
                <li>ગુગલ</li>
                <li>ગગરીયા</li>
                <li>ગંભીર</li>
                <li>ગબુળ</li>
                <li>ગભુરડા</li>
                <li>ગેરીયા</li>
                <li>ગરભેયા</li>
                <li>ગરભયા (ગરભિયા)</li>
                <li>ગરડીયા</li>
                <li>ગભરા</li>
                <li>ગઠીયા</li>
                <li>ગભરા</li>
                <li>ગોરખડીયા</li>
                <li>ગીરભડા</li>
                <li>ગોબર</li>
                <li>ગોરબડા</li>
                <li>ગુમલિયા</li>
                <li>ગોહેલ (છોટાળા)</li>
                <li>ગોહેલ (ગિરનારા)</li>
                <li>ગાધે</li>
                <li>ઘોઘેલીયા</li>
                <li>ઘાઘલીયા</li>
                <li>ઘુલ</li>
                <li>ઘુસર</li>
                <li>ઘોઘર</li>
                <li>ઘોઘરીયા</li>
                <li>ઘમાચ</li>
                <li>ઘુધર</li>
                <li>ઘુધરડા</li>
                <li>ઘુરભડા</li>
                <li>ઘેથડિયા</li>
                <li>ઘોથળ</li>
                <li>ઘરવડા</li>
                <li>ઘુમર</li>
                <li>ઘોચર</li>
                <li>ચંદ્રવાડીયા</li>
                <li>ચોચા</li>
                <li>ચુડાસમા</li>
                <li>ચુંચર (છુંછર)</li>
                <li>ચવાણ</li>
                <li>ચરમડા</li>
                <li>ચાવડા</li>
                <li>ચોપડા</li>
                <li>ચુંપર</li>
                <li>ચરપડિયા</li>
                <li>ચુડા</li>
                <li>ચરવડા</li>
                <li>ચમરા</li>
                <li>ચાતરીયા</li>
                <li>ચોરવડા</li>
                <li>ચાચરીયા</li>
                <li>ચાચવા</li>
                <li>ચેતરીયા</li>
                <li>છેતરીયા</li>
                <li>છેટવા</li>
                <li>છટવા</li>
                <li>છેભરડા</li>
                <li>છેતમડા</li>
                <li>છતુર</li>
                <li>છેરમા</li>
                <li>છરવા</li>
                <li>છેરમડા</li>
                <li>છસોટીયા</li>
                <li>છુટવા</li>
                <li>છાત્રોડીયા (છાતોડિયા)</li>
                <li>છેતળા</li>
                <li>છેતરડા</li>
                <li>છતપડા</li>
                <li>છતુરા</li>
                <li>જોગલ</li>
                <li>જીંજવા</li>
                <li>જુવા</li>
                <li>જુજવાળિયા (જુજવારિયા)</li>
                <li>ઝાલા</li>
                <li>જમંળા (જમંડા)</li>
                <li>જીરોડા (જીરોળા)</li>
                <li>જૈલડા (જૈલળા)</li>
                <li>જુરમડા</li>
                <li>જીલડીયા</li>
                <li>જુમર</li>
                <li>જુમરા</li>
                <li>જોટવા</li>
                <li>જવેર</li>
                <li>જરેર</li>
                <li>જાકોત્રા</li>
                <li>જાદવ</li>
                <li>જીંજાળા</li>
                <li>ટૂટ</li>
                <li>ટૂરવળા (ટૂરવડા)</li>
                <li>ટૂરડ</li>
                <li>ટગરવા</li>
                <li>ટેગરા</li>
                <li>ટરવા</li>
                <li>ટૂગર</li>
                <li>ટૂબર</li>
                <li>ટૂખરા</li>
                <li>ટીટોડા (ટીટોળા)</li>
                <li>ટીટોળ (ટીટોડ)</li>
                <li>ટહર</li>
                <li>ટરવળા (ટરવડા)</li>
                <li>ઠેસીયા</li>
                <li>ઠરડા (ઠરળા)</li>
                <li>ઠોરડા (ઠોરળ)</li>
                <li>હુમરા</li>
                <li>ઠૂમરા</li>
                <li>ઠેબા</li>
                <li>ઠેબર</li>
                <li>ઠોઠા</li>
                <li>ઠોઠર</li>
                <li>ઠુઠર</li>
                <li>ડાંગર</li>
                <li>ડેર</li>
                <li>ડુવા</li>
                <li>ડોડીયા</li>
                <li>ડમરા</li>
                <li>ડુમર</li>
                <li>ડુંગર</li>
                <li>ડગરડા (ડગરળા)</li>
                <li>ડુગર</li>
                <li>ડગર (ડગળ)</li>
                <li>ડાખલખીયા (ડાખલકીયા)</li>
                <li>ડોળ (ડોડ)</li>
                <li>ડામરડા (ડામરળા)</li>
                <li>ડોફરડા (ડોફરળા)</li>
                <li>ડબુ</li>
                <li>ડાંભરડા (ડાંભરળા)</li>
                <li>ડાંભ</li>
                <li>ડાભ</li>
                <li>ઢુંઢ</li>
                <li>ઢુવા</li>
                <li>ઢુમર</li>
                <li>ઢોલા</li>
                <li>ઢુંગર (ઢુંગળા)</li>
                <li>ઢામર</li>
                <li>ઢેલા</li>
                <li>ઢરવાળા (ઢરવડા)</li>
                <li>ઢોલ</li>
                <li>ઢામેલ</li>
                <li>ઢામલછોટીયા</li>
                <li>ઢોળ (ઢોડ)</li>
                <li>ઢબુરા</li>
                <li>ઢબુ</li>
                <li>ઢીંડોળા (ઢીંડોરા)</li>
                <li>ઢેપરડા</li>
                <li>ઢેપર</li>
                <li>ઢંગળા</li>
                <li>ઢેગા</li>
                <li>ઢેગરડા</li>
                <li>ઢેગડા</li>
                <li>ઢાલેચા</li>
                <li>ઢોંચ</li>
                <li>તોસીયા</li>
                <li>તોરડીયા</li>
                <li>તોસ્તરીયા</li>
                <li>તોરડ</li>
                <li>તર૫તા</li>
                <li>તોસા</li>
                <li>તોતા</li>
                <li>તોતીયા</li>
                <li>તરમળા (તરમડા)</li>
                <li>દેગડી</li>
                <li>દુગરી</li>
                <li>દેથળીયા (દેથાળીયા)</li>
                <li>દેથુરળા (દેથુરડા)</li>
                <li>દર્મળા (દર્મડા)</li>
                <li>દોગળ (દોગડ)</li>
                <li>દુગલ</li>
                <li>ધુવા</li>
                <li>ઘંઘવા</li>
                <li>ધ્રામણછોટિયા</li>
                <li>ધુવાળા</li>
                <li>ધમરોળિયા</li>
                <li>ધરવાળા</li>
                <li>ધરમડા (ધરમળા)</li>
                <li>ધમાડ (ધમાળ)</li>
                <li>ધ્રેવાળા (ધ્રેવાડા)</li>
                <li>ધ્રાંગુ</li>
                <li>નંદાણીયા</li>
                <li>નર્મળા (નર્મડા)</li>
                <li>નોળ (નોડ)</li>
                <li>નાઘેરા</li>
                <li>નિરોળા (નિરોડા)</li>
                <li>નાસતીયા</li>
                <li>નિઢોળા (નિઢોડા)</li>
                <li>નિમંળા (નિમંડા)</li>
                <li>નિસ્ત્રા</li>
                <li>નરૂડા (નરૂળા)</li>
                <li>નારડ (નારળ)</li>
                <li>નરડ</li>
                <li>નરેણિયા</li>
                <li>પરમાર</li>
                <li>પોસતરીયા</li>
                <li>પરબડા (પરબળા)</li>
                <li>પાનેરા</li>
                <li>પુરવા</li>
                <li>પુરવરવા</li>
                <li>પોરીડા (પોરીળા)</li>
                <li>પુરડ</li>
                <li>પેરીયા</li>
                <li>પાસત</li>
                <li>પંપાણીયા (પપાળીયા)</li>
                <li>પૂછડીયા</li>
                <li>પાસીયા</li>
                <li>પપાણ</li>
                <li>પોચીયા</li>
                <li>પારુ</li>
                <li>પરડા</li>
                <li>પેડા</li>
                <li>પાડા</li>
                <li>પીંડારીયા</li>
                <li>પરચુડા (પરચુળા)</li>
                <li>પેપરીયા</li>
                <li>પેરસ</li>
                <li>પુરવાળા</li>
                <li>પટાટ</li>
                <li>પીઠિયા</li>
                <li>પાંવ</li>
                <li>પીંજર</li>
                <li>બારૈયા (બારીયા)</li>
                <li>બાખલકિયા</li>
                <li>બાખલકા</li>
                <li>બોચીયા</li>
                <li>બડાઈ (બળાઈ/બરાઈ)</li>
                <li>બારડ</li>
                <li>બેરીયા</li>
                <li>બોદર</li>
                <li>બેરા</li>
                <li>બરવાળા</li>
                <li>બોચ</li>
                <li>બંશુર</li>
                <li>બાબરીયા</li>
                <li>બરળીયા</li>
                <li>બરવડીયા</li>
                <li>બાપટીયા</li>
                <li>બસરીયા</li>
                <li>બોચા</li>
                <li>બારવા</li>
                <li>બેખરીયા</li>
                <li>બારાઈ</li>
                <li>બેખર</li>
                <li>બબર</li>
                <li>બબરા</li>
                <li>બેડા</li>
                <li>બેખડ</li>
                <li>બોર</li>
                <li>બંધીયા</li>
                <li>બેલા</li>
                <li>બેરાવા</li>
                <li>બેસા</li>
                <li>બોરખતરીયા</li>
                <li>બામરોટીયા</li>
                <li>બરડવા</li>
                <li>બકુગા</li>
                <li>બકોતરા</li>
                <li>ભેડા</li>
                <li>ભારવડીયા (ભારવળીયા)</li>
                <li>ભથૂર ભેડા (કહળીયા)</li>
                <li>ભૂંથર ભેડા (રાહા)</li>
                <li>ભેટારીયા ભેડા (પાડા)</li>
                <li>ભેડરડા ભેડા (રેશમીયા)</li>
                <li>ભેરડા (ભેરળા) ભેડા (બૈગોતરીયા)</li>
                <li>ભૂવા ભેડા (રામોતીયા)</li>
                <li>ભમરભેડા (પાસ્તરીયા)</li>
                <li>ભરડ ભેડા (રાદતીયા)</li>
                <li>ભોરળ (ભેડામાં ૧૦ ભાગ છે)</li>
                <li>ભરડા</li>
                <li>ભારડ (ભારળ)</li>
                <li>ભુરડ (ભુરળ)</li>
                <li>ભૂતૈયા (ભૂતિયા)</li>
                <li>ભાટીયા</li>
                <li>ભાતીયા</li>
                <li>ભીંભા</li>
                <li>ભાટુ</li>
                <li>ભોપાળા</li>
                <li>ભાદરકા</li>
                <li>ભમ્મર</li>
                <li>ભોસીયા</li>
                <li>મેરીયા</li>
                <li>મેહીથર</li>
                <li>મોરી</li>
                <li>મોહીથર</li>
                <li>મહીતર</li>
                <li>મારડીયા</li>
                <li>માડીયા</li>
                <li>મીયાજળ</li>
                <li>મારુ</li>
                <li>મોરડા</li>
                <li>મોરડ</li>
                <li>મોર (મહથલ)</li>
                <li>મલુડા</li>
                <li>મલફળા</li>
                <li>મરડા</li>
                <li>મુલડા</li>
                <li>મુળા</li>
                <li>મારેથા</li>
                <li>મુળ</li>
                <li>મોરાશીયા</li>
                <li>મારડ</li>
                <li>મરમડા</li>
                <li>માડમ</li>
                <li>મારચ</li>
                <li>મસરુ</li>
                <li>મરંડ</li>
                <li>મહેતા</li>
                <li>રાવલીયા</li>
                <li>રામોતીયા</li>
                <li>રાદતીયા</li>
                <li>રાસતીયા</li>
                <li>રાસકિયા</li>
                <li>રણમળા</li>
                <li>રેતીયા (રેતીયા)</li>
                <li>રાહા</li>
                <li>રાથળિયા</li>
                <li>રડમડા (રડમળા)</li>
                <li>રાથલીયા</li>
                <li>રામ</li>
                <li>રાજતીયા</li>
                <li>લાગરીયા</li>
                <li>લાલુ</li>
                <li>લાલ</li>
                <li>લઠીયા</li>
                <li>લાઠીયા</li>
                <li>લોચીયા</li>
                <li>લેબરીયા (લેબૌરીયા)</li>
                <li>લેરીયા</li>
                <li>લાલડા (લાલળા)</li>
                <li>લાખણોતરા (લાખણોતરીયા)</li>
                <li>લાબરીયા</li>
                <li>લબારીયા</li>
                <li>લછોટ</li>
                <li>લછોળ</li>
                <li>લોલ</li>
                <li>લગારીયા</li>
                <li>લોલીયા</li>
                <li>લુવા</li>
                <li>વસહરા</li>
                <li>વસર (વહર)</li>
                <li>વરુ</li>
                <li>વરુ (બાબરીયામાંથી થયા)</li>
                <li>વામણોટીયા</li>
                <li>વાસીયા</li>
                <li>વસવાટ</li>
                <li>વરહળા</li>
                <li>વસડા (વસળા)</li>
                <li>વાસટીયા (વાસતીયા)</li>
                <li>વાસળીયા</li>
                <li>વામન</li>
                <li>વારોતરીયા</li>
                <li>વડવાયા</li>
                <li>વીછોટ</li>
                <li>વતરીયા</li>
                <li>વીછોળા</li>
                <li>વાહા (વાસા)</li>
                <li>વેરવળા</li>
                <li>વીંછી</li>
                <li>વાળા</li>
                <li>વરપડા</li>
                <li>વીરૂડા</li>
                <li>વરવડા</li>
                <li>વિંછું</li>
                <li>વાણીયા</li>
                <li>વસ્તા</li>
                <li>વિસતરા</li>
                <li>વાદા</li>
                <li>વરવાળીયા</li>
                <li>વિછટવા</li>
                <li>વાઢિયા</li>
                <li>વિંજવા</li>
                <li>વાઢેર</li>
                <li>વણજર</li>
                <li>વાઘ</li>
                <li>સોલંકી (ભીમોજીયા)</li>
                <li>સોલંકી (રામ)</li>
                <li>સોલંકી</li>
                <li>સીંહોટીયા</li>
                <li>સિત્રોડા</li>
                <li>સાતરખી</li>
                <li>સાતરંખી</li>
                <li>સુવા</li>
                <li>સાતોરડા (સાતોરળા)</li>
                <li>સાસતીયા</li>
                <li>સમરડા (સમરળા)</li>
                <li>સોરઠા</li>
                <li>સોરઠિયા</li>
                <li>સોરડા (સોરળા)</li>
                <li>5:24</li>
                <li>સઠુ</li>
                <li>5:27</li>
                <li>સળ (સડ)</li>
                <li>સઢ</li>
                <li>સમર</li>
                <li>સુમર</li>
                <li>સુમરા</li>
                <li>સપળા</li>
                <li>હાથલીયા</li>
                <li>હાથીયા</li>
                <li>હાથી</li>
                <li>હાથળ (હાથડ)</li>
                <li>હાથઢ</li>
                <li>હુંથલ</li>
                <li>હરમડા (હરમળા)</li>
                <li>હોથલડા (હોથલળા)</li>
                <li>હોથિયા</li>
                <li>હિસ્ત્રોડા (હિસ્તોળા)</li>
                <li>હરડા (હરળા)</li>
                <li>હાંસોટા</li>
                <li>હાસોળા</li>
                <li>હસ્થડા (હસ્થળા)</li>
                <li>હાજીપરા</li>
                <li>હજપરા</li>
                <li>અખેડ</li>
                <li>અરડા (અરળા)</li>
                <li>આંબલીયા</li>
                <li>આંબળીયા (આંબડીયા)</li>
                <li>અઈડા (અઈળા)</li>
                <li>ઓઠીયા</li>
                <li>ઓરઠ</li>
                <li>ઓઠરડા (ઓઠરળા)</li>
                <li>અરમડા (અરમળા)</li>
                <li>અરમળ</li>
                <li>ઓજોઠ</li>
                <li>ઓજોઠીયા</li>
                <li>અરપરા</li>
                <li>એપડા (એપળા)</li>
                <li>ઓરડ</li>
                <li>ઊંટડીયા</li>
                <li>5:28</li>
                <li>ઉંછડીયા</li>
                <li>ઉંભરડા</li>
                <li>ઉંબર</li>
                <li>ઉંભરળા</li>
                <li>ઉગર</li>
                <li>ઉગરડા</li>
                <li>ઉરડ (ઉરળ)</li>
                <li>ઉરડ (ઉરળા)</li>
                <li>ઉતડ (ઉતળ)</li>
            </ul>
        `
        },
        // done
        {
            id: 2,
            title: "મચ્છોયા",
            content: `
            <ul>
                <li>ડાંગર</li>
                <li>ચાવડા</li>
                <li>હુંબલ</li>
                <li>મકવાણા</li>
                <li>શેગલિયા</li>
                <li>મરંડ</li>
                <li>સોલંકી</li>
                <li>બાલાસરા</li>
                <li>લોખીલ</li>
                <li>કાનગડ</li>
                <li>વરચંડ</li>
                <li>ખાભરા</li>
                <li>સાંચલ</li>
                <li>ગોગળા</li>
                <li>બકુત્રા</li>
                <li>ડવ</li>
                <li>બાબરીયા</li>
                <li>બરાલિયા</li>
                <li>ધ્રાંગા</li>
                <li>સિંહાર (શિયાળ)</li>
                <li>અવાડિયા</li>
                <li>કુવાડિયા</li>
                <li>જાંટિયા</li>
                <li>મિયાત્રા (મંયાત્રા)</li>
                <li>મૈયડ</li>
                <li>જેર</li>
                <li>જળુ (જલુ)</li>
                <li>છૈયા</li>
                <li>ચાટ</li>
                <li>રાઠોડ</li>
                <li>કારેથા</li>
                <li>મારુ</li>
                <li>જાદવ</li>
                <li>ઝીલડિયા</li>
                <li>મેતા</li>
                <li>હેરભા</li>
                <li>ખંટારિયા</li>
                <li>ખાટરીયા</li>
                <li>વીરડા</li>
                <li>બોરીચા</li>
                <li>વળૈયા (વળૈયા)</li>
                <li>ખુંગાલ</li>
                <li>કોઠિવાળ</li>
                <li>ગુજરિયા</li>
                <li>ગોહિલ (ગોહેલ)</li>
                <li>કુગસિયા</li>
                <li>સોનારા</li>
                <li>લાવડિયા</li>
                <li>આગરિયા</li>
                <li>કાતડ</li>
                <li>સાભાળ</li>
                <li>ગરૈયા (ગરિયા)</li>
                <li>લૈયા</li>
                <li>માખેલા</li>
                <li>ખીમાણિયા</li>
                <li>વેગડ</li>
                <li>બૌવા</li>
                <li>મૈયડ</li>
                <li>બરબસિયા</li>
                <li>બસિયા</li>
                <li>વીંછીયા</li>
                <li>ચુડાસમા</li>
                <li>સિંધવ</li>
                <li>કુગસિયા</li>
                <li>ઉંદરિયા</li>
            </ul>
            `
        },
        // done
        {
            id: 3,
            title: "બોરિયા",
            content: `
            <ul>
                <li>વિરડા</li>
                <li>બસીયા</li>
                <li>ખાડેખા</li>
                <li>જેઠા</li>
                <li>બાબરિયા</li>
                <li>ગોગરા</li>
                <li>દાસોટીયા</li>
                <li>હમકા</li>
                <li>ગોગા</li>
                <li>ગજિયા</li>
                <li>ગળચર</li>
                <li>ડોચર</li>
                <li>વસોટા</li>
                <li>પીઠમલ</li>
                <li>વાંક</li>
                <li>વાળિયા</li>
                <li>કુંભરવાડીયા</li>
                <li>બાળા</li>
                <li>ડાવેરા</li>
                <li>ભળદ</li>
                <li>પીઠસલ</li>
                <li>કાંગડ</li>
                <li>માલા</li>
                <li>સવસેટા</li>
                <li>વાળા</li>
                <li>આગલ</li>
                <li>જીલરીયા</li>
                <li>ખમખેચા</li>
                <li>ખાદા</li>
                <li>ખંખાળીયા</li>
                <li>રાખેચા</li>
                <li>દેગરમા</li>
                <li>ખુગલા</li>
                <li>મકવાણા</li>
                <li>નારડા</li>
                <li>વણરા</li>
                <li>મૈયા</li>
                <li>કિહોર</li>
                <li>બરબસિયા</li>
                <li>હુંબલ</li>
                <li>જોગેલા</li>
                <li>તોરીયા</li>
                <li>ખામટા</li>
                <li>કાગડા</li>
                <li>પૂડેચા</li>
                <li>મૈયડ</li>
                <li>સબાડ</li>
                <li>મઠિયા</li>
                <li>માવલા</li>
                <li>સોઢિયા</li>
                <li>મજેઠા</li>
                <li>ધુનધવ</li>
                <li>જારીયા</li>
            </ul>
            `
        },
        // done
        {
            id: 4,
            title: "પંચોલી",
            content: `
            <ul>
                <li>ખાગડ</li>
                <li>કાતરિયા</li>
                <li>બાળદાણિયા</li>
                <li>વાઘમશી</li>
                <li>પરડવા</li>
                <li>હડિયા</li>
                <li>શ્યોરા (શ્યારા, શિયાળ)</li>
                <li>વાણિયા</li>
                <li>લાડુમોર</li>
                <li>ડબા / ડોલર</li>
                <li>બાંભણિયા</li>
                <li>જાળોધરા</li>
                <li>કુવાડ</li>
                <li>કાશિયા</li>
                <li>નાગોથા / નાગેશ્રી</li>
                <li>નાગેચા</li>
                <li>છોટાળા</li>
                <li>કાછડ</li>
                <li>ભડક</li>
                <li>ઢોલા</li>
                <li>ગુજર</li>
                <li>નકુમ</li>
                <li>વાળા</li>
                <li>મકવાણા</li>
                <li>જીંજાળા</li>
                <li>ધનગન</li>
                <li>ગુદાસણિયા</li>
                <li>શિસરા</li>
                <li>સોલંકી</li>
                <li>સેલોત</li>
                <li>માલસોતર</li>
                <li>રોયલા</li>
                <li>પાધરિયા</li>
                <li>ઝીલરીયા</li>
                <li>મછરાળા</li>
                <li>ચાવડા</li>
                <li>પંડરખિયા</li>
                <li>શીણવા</li>
                <li>બાંભરિયા</li>
                <li>મહીડા</li>
                <li>ભાલીયા</li>
                <li>ઝાંખરા</li>
                <li>સલઘરા</li>
                <li>હુંબલ</li>
                <li>કળસરીયા</li>
            </ul>
            `
        },
        // done
        {
            id: 5,
            title: "વણાર",
            content: `
            <ul>
                <li>હરકટ</li>
                <li>પોસાતર</li>
                <li>માહેડિયા</li>
                <li>બરાડ</li>
                <li>ભૂંગરા</li>
                <li>જમકર</li>
                <li>બુઘેલા</li>
                <li>રોયલા</li>
                <li>લાપા</li>
                <li>બળસરીયા</li>
                <li>સતાતર</li>
                <li>દેશાઈ</li>
                <li>શીઢા</li>
                <li>સીઢા</li>
                <li>વણારકા</li>
                <li>દોરીયા</li>
                <li>પરમાર</li>
                <li>ભૂંકણ</li>
                <li>પોપટ</li>
                <li>જાજડા</li>
                <li>કિકર</li>
                <li>મેંગળ</li>
                <li>વાઘોસીયા</li>
                <li>લાડુમોર</li>
                <li>ભેલડા</li>
                <li>રાસડ</li>
                <li>મેપાળ</li>
                <li>ડાંગર</li>
                <li>ભદાવણીયા</li>
                <li>કામળીયા</li>
                <li>મોભ</li>
                <li>ફગા</li>
                <li>માપડા</li>
                <li>સોવટીયા</li>
            </ul>
            `
        },
        // done
        {
            id: 6,
            title: "પ્રાથરીયા",
            //  (પ્રાચરીયા)
            content: `
            <ul>
                <li>સાંગા</li>
                <li>ચાડ</li>
                <li>ગલિયા (ગલૈયા)</li>
                <li>ઉદરીયા</li>
                <li>વરચંદ</li>
                <li>ઢીલા</li>
                <li>મણવર</li>
                <li>ચાવડા</li>
                <li>વારોતરા</li>
                <li>સેગલિયા</li>
                <li>બારૈયા</li>
                <li>ખાહા</li>
                <li>ખમણ</li>
                <li>કોતર</li>
                <li>જોહરફાળ</li>
                <li>હેઠવાડિયા</li>
                <li>છડીઠોક</li>
                <li>ડાંગર</li>
                <li>સોનારા</li>
                <li>બાળા</li>
                <li>બરિયા</li>
                <li>કેસરિયા</li>
                <li>માતા</li>
                <li>બતા</li>
                <li>ગાગલ</li>
                <li>ચૈયા</li>
                <li>જાટીયા</li>
                <li>વીજા</li>
                <li>વીંછીયા</li>
                <li>વીરા</li>
            </ul>
            `
        },
        // done
        {
            id: 7,
            title: "ચોરડા",
            content: `
            <ul>
                <li>કાચડ</li>
                <li>મરંડા (મેંડા)</li>
                <li>હેઠવાડિયા</li>
                <li>બરસીયા</li>
                <li>એવાર</li>
                <li>કેળ</li>
                <li>બકુતરીયા</li>
                <li>મકવાણા</li>
                <li>જેર</li>
                <li>કોડ</li>
                <li>બોરીયા</li>
                <li>ડાંગર</li>
                <li>સાંચલ</li>
                <li>જાંટીયા</li>
                <li>કુવાડીયા</li>
                <li>માતા (મેતા)</li>
                <li>હુંબલ</li>
                <li>ગોરિયા</li>
                <li>સોનારા</li>
                <li>મ્યાત્રા</li>
            </ul>
            `
        },
        // done
        {
            id: 8,
            title: "વાઘડિયા",
            content: `
            <ul>
                <li>ખમળ</li>
                <li>ઢીલા (બાલાસુર)</li>
                <li>કેરાસિયા</li>
                <li>કોતર</li>
                <li>કુવાડિયા</li>
                <li>ડાંગર</li>
                <li>બતા</li>
                <li>સાંગા</li>
                <li>ચાવડા</li>
                <li>હુંબલ</li>
                <li>બોરીચા</li>
                <li>બરબસિયા</li>
                <li>હેઠવાડિયા</li>
            </ul>
            `
        },
        {
            id: 9,
            title: "મોભ",
            content: `
            <ul>
                <li>મોભ</li>
            </ul>
            `
        },
        {
            id: 10,
            title: "કામળીયા",
            content: `
            <ul>
                <li>કામળીયા</li>
            </ul>
            `
        },
        // done
        {
            id: 11,
            title: "નાઘેર",
            content: `
            <ul>
                <li>વાઘ</li>
                <li>રામ</li>
                <li>લાખણોત્રા</li>
                <li>વાવડીયા</li>
                <li>પટાટ</li>
                <li>પીંજર</li>
                <li>વણજર</li>
                <li>નોળ</li>
                <li>ડેર</li>
            </ul>
            `
        },
    ]

    const [selectedId, setSelectedId] = useState(Data_Main[0]?.id || null);
    const selectedItem = Data_Main.find(d => d.id === selectedId) || Data_Main[0];
    const getListItems = (html = '') => {
        const matches = [...(html.matchAll(/<li>(.*?)<\/li>/gi))];
        return matches.map(m => m[1].trim()).filter(Boolean);
    };
    const makeColumns = (items, cols = 4) => {
        if (!items || items.length === 0) return Array.from({ length: cols }, () => []);
        const perCol = Math.ceil(items.length / cols);
        const result = [];
        for (let i = 0; i < cols; i++) {
            result.push(items.slice(i * perCol, (i + 1) * perCol));
        }
        return result;
    };
    const listItems = getListItems(selectedItem?.content || '');
    const columns = makeColumns(listItems, 4);
    // Prepare news list with featured item first
    const newsList = Array.isArray(data4?.data) ? [...data4.data] : [];
    if (featuredId) {
        const idx = newsList.findIndex(n => n.id === featuredId);
        if (idx > 0) {
            const [item] = newsList.splice(idx, 1);
            newsList.unshift(item);
        }
    }

    // if (!data) return <h3>Loading...</h3>;

    // Collect unique category names so we don't print duplicates repeatedly
    // const uniqueCategories = [...new Set(items.map((it) => it.category_name))];

    // helper function to force https
    // const secureUrl = (url) => url?.replace(/^http:\/\//i, "https://");

    return (
        <>
            <div className='container'>
                <div className='row ABout_ImG mb-1'>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <h1 className='text-center py-2' style={{ color: '#067C71', fontWeight: '600', fontSize: '45px' }}>આહિરોમાં પેટા વિભાગોની કુલ અટકો ૭૩૬ નીચે પ્રમાણે છે.</h1>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <h2 className='text-center py-2 h3' style={{ color: '#067C71', fontSize: '20px' }}>જ્યોત અંક ૧ માંથી માહિતી લીધેલ છે.</h2>
                    </div>
                    <div className='col-12 col-md-12 col-lg-12'>
                        <p className='text-center' style={{ color: '#067C71', fontSize: '18px' }}>બ્રહ્માની પેઢીથી ૬૫મી પેઢીએ શ્રી કૃષ્ણનો જન્મ થાય છે તેવું તારણ છે
                            શ્રી કૃષ્ણ જયારે સૌરાષ્ટ્રમાં દ્વારકા આવ્યા ત્યારે તેની સાથે આહિરો મોટી સંખ્યામાં આવ્યા. તે વખતે આહિરોમાં પેટા શાખા કે અલગ-અલગ અટકો હતી.
                            માત્ર આહિર કે યાદવ ના નામથીજ ઓળખવામાં આવતા. જેનું પ્રમાણ ભાગવદ્ગીતા, શિવપુરાણ, ગર્ગસંહિન વગેરે પુરાણોમાં જોવા મળે છે.
                            દેશકાળના વસવાટ પ્રમાણે માણસોની સંખ્યાના પ્રમાણમાં જુદા જુદા કામધંધા માટે પ્રદેશમાં વસવાટ કરવા જવાથી તે પ્રદેશ પરથી અટકો પડવા લાગી. ગુજરાત સિવાય આહિરોમાં પેટા શાખા હતું નહી.
                            બીજા પ્રદેશોમાં યાદવ તરીકે ઓળખાય છે. તેમાં અલગ પેટા શાખા આવતી નથી. ગુજરાતમાં અલગ-અલગ વિસ્તારના વસવાટ પ્રમાણે શાખાઓ પડી છે.</p>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row mb-5'>
                    {/* Desktop View Sidebar */}
                    <div className="d-none d-md-block col-12 col-md-3 sidebar-scrollable"
                        style={{ maxHeight: "63vh", overflowY: "auto" }}>

                        {Array.isArray(Data_Main) && Data_Main.map((data) => (
                            <div className="mb-3"
                                style={{ border: "2px solid #067C71", borderRadius: "22px" }}
                                key={data.id}>

                                <div
                                    className="Main-Card_1 p-2"
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: selectedId === data.id ? "#067C71" : undefined,
                                        color: selectedId === data.id ? "#ffffff" : undefined,
                                        border: selectedId === data.id ? "1px solid rgba(0,0,0,0.1)" : undefined,
                                    }}
                                    onClick={() => setSelectedId(data.id)}
                                >
                                    <b className="m-2 text-center">{data.title}</b>
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* Mobile View List */}
                    <div className="d-block d-md-none col-12">
                        {openSidebar && (
                            <div className="accordion" id="mobileAccordion">
                                {Array.isArray(Data_Main) && Data_Main.map((data) => (
                                    <div
                                        className="accordion-item mb-2"
                                        key={data.id}
                                        style={{
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            border: "2px solid #067C71"
                                        }}
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-button ${selectedId === data.id ? "" : "collapsed"}`}
                                                type="button"
                                                onClick={() => setSelectedId(selectedId === data.id ? null : data.id)}
                                                style={{
                                                    backgroundColor: selectedId === data.id ? "#067C71" : "#fff",
                                                    color: selectedId === data.id ? "#fff" : "#067C71",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {data.title}
                                            </button>
                                        </h2>

                                        {/* ▼ SHOW THIS DATA WHEN OPEN ▼ */}
                                        {selectedId === data.id && (
                                            <div className="accordion-body">

                                                <div className="d-flex d-md-none flex-wrap">
                                                    {columns.flat().map((li, idx) => (
                                                        <div className="col-6 mb-2" key={idx}>
                                                            <span
                                                                style={{
                                                                    fontWeight: 600,
                                                                    color: "#067C71",
                                                                    display: "block",
                                                                }}
                                                            >
                                                                • {li}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Main content for selected item — ONLY Desktop View */}
                    <div
                        className="col-12 col-md-9 sidebar-scrollable d-none d-md-block"
                        style={{
                            maxHeight: "62vh",
                            overflowY: "auto",
                            border: "2px solid #067C71",
                            borderRadius: "22px",
                        }}
                    >
                        <div className="p-4">
                            <h1
                                className="text-center mb-3"
                                style={{
                                    fontWeight: 600,
                                    color: "#067C71",
                                    borderBottom: "1px solid #067C71"
                                }}
                            >
                                {selectedItem?.title}
                            </h1>

                            <div className="row">
                                <div className="d-none d-md-flex flex-wrap">
                                    {columns.map((col, i) => (
                                        <div className="col-md-3 mb-2" key={i}>
                                            <ul className="list-unstyled" style={{ color: "#067C71" }}>
                                                {col.map((li, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="mb-1"
                                                        style={{ fontWeight: 600, color: "#067C71" }}
                                                    >
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About_us;
