const form = document.getElementById('registrationForm');
const btn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const loader = document.getElementById('loader');
const msg = document.getElementById('message');

// CONFIGURAÇÃO
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwHTRxhOutgOrC3rfZwneKRm16dNRRNZhnnbU0vlGttUhnfyUfqKky-bxwokAg6NlbWBQ/exec"; // Substitua pela URL do seu Web App
const SEU_WHATSAPP = "555132884938"; 

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btnText.innerText = "PROCESSANDO...";
    loader.style.display = "block";
    msg.innerText = "";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        msg.innerText = "✅ Cadastro salvo! Abrindo WhatsApp...";
        msg.style.color = "#a5d6a7";

        setTimeout(() => {
            const textoWhats = encodeURIComponent(`Olá! Finalizei meu cadastro no sistema MKS Tech Solutions.\n\n👤 Nome: ${data.nome}\n🆔 CPF: ${data.cpf}`);
            window.location.href = `https://wa.me/${SEU_WHATSAPP}?text=${textoWhats}`;
        }, 1500);

    } catch (error) {
        msg.innerText = "❌ Erro de conexão. Tente novamente.";
        msg.style.color = "#ef9a9a";
        btn.disabled = false;
        btnText.innerText = "ENVIAR E IR PARA O WHATSAPP";
        loader.style.display = "none";
    }
});
