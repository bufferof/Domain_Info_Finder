function find_domain(form)
{
    let domain = form.domain_input.value;

    if(!domain.slice(-3).includes('.kr')){
        alert('Top Level Domain이 .kr인 도메인만 가능합니다');
    }

    fetch(`http://apis.data.go.kr/B551505/whois/domain_name?serviceKey=UGJ8gXjCfh%2FC8Ek72mAP4Zel%2BCY%2FjdLnBzbvEDUa60gqxuHTPl1RKCeTevItd%2FFRT6NjQsY7fgdnM3OMSMTXKA%3D%3D&query=${domain}&answer=json`)
    .then(response => response.json())
    .then(data => {
        const result = data.response.result;
        const krdomain = data.response.whois.krdomain;

        if(result.result_msg == "정상 응답 입니다."){
            let infos = document.getElementById('infos').children;

            for(var obj of infos){
                const h2 = obj.getElementsByTagName('h2')[0];
                const key = obj.id;

                if (h2 && krdomain[key] !== undefined) {
                    h2.textContent = krdomain[key];
                } 
                else {
                    h2.textContent = "정보 없음";
                }
            }

            const ns_box = document.getElementById('ns1');
            ns_box.textContent = krdomain.ns[1];

            const title = document.getElementById('output_title');
            title.innerHTML = `도메인 <span style="color: #4169E1; font-weight: bold;">${krdomain['name']}</span>에 대한 정보`;

            document.querySelector("#output").scrollIntoView({
                behavior: "smooth"
            });
        }
        else{
            return
        }
    })
}

function returnback()
{
    document.querySelector("#search").scrollIntoView({
        behavior: "smooth"
    });
}