function initSite() {
  const root = document.documentElement;
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('theme');
  } catch (error) {
    storedTheme = null;
  }

  if (storedTheme === 'light') {
    root.classList.add('light');
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('light');
      try {
        localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
      } catch (error) {
        // ignore storage write failures
      }
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('show'));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('visible'));
  }

  const qrMount = document.getElementById('portfolio-qrcode');
  const portfolioUrl = 'https://github.com/arockiroad-glitch/Portfolio';

  function renderQrFallback(element, value) {
    const encodedValue = encodeURIComponent(value);
    const image = document.createElement('img');
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodedValue}`;
    image.alt = 'Portfolio QR code';
    image.width = 180;
    image.height = 180;
    image.loading = 'lazy';
    element.replaceChildren(image);
  }

  if (qrMount) {
    try {
      if (typeof QRCode !== 'undefined') {
        qrMount.replaceChildren();
        new QRCode(qrMount, {
          text: portfolioUrl,
          width: 180,
          height: 180,
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        renderQrFallback(qrMount, portfolioUrl);
      }
    } catch (error) {
      renderQrFallback(qrMount, portfolioUrl);
    }
  }

  const panel = document.getElementById('chatPanel');
  const msgs = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');

  if (panel && msgs && input && send) {
    const faq = [
      {
        keys: ['skill', 'skills', 'tech stack', 'technology', 'tools'],
        answer: 'My main skills include Linux, Windows Server, Active Directory, network fundamentals, troubleshooting, and virtualization tools like Hyper-V, VMware, and VirtualBox.'
      },
      {
        keys: ['experience', 'background', 'work', 'internship'],
        answer: 'I am currently building hands-on lab experience in infrastructure and systems administration while pursuing Information/Computer Technology at Bowie State University.'
      },
      {
        keys: ['project', 'projects', 'built', 'portfolio'],
        answer: 'I have built lab-focused projects including Attack and Defense simulations and multi-OS boot and partition testing workflows.'
      },
      {
        keys: ['contact', 'email', 'reach', 'hire'],
        answer: 'You can contact me at arockiroad@gmail.com.'
      }
    ];

    function addMsg(text, who = 'bot') {
      const message = document.createElement('div');
      message.className = `cb-msg ${who}`;
      message.textContent = text;
      msgs.appendChild(message);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function getReply(question) {
      const text = question.toLowerCase();
      const hit = faq.find((item) => item.keys.some((keyword) => text.includes(keyword)));
      if (hit) {
        return hit.answer;
      }
      return 'I can answer questions about skills, experience, projects, and contact info. Try one of the quick buttons.';
    }

    function ask(question) {
      const trimmed = question.trim();
      if (!trimmed) {
        return;
      }
      addMsg(trimmed, 'user');
      setTimeout(() => addMsg(getReply(trimmed), 'bot'), 250);
    }

    if (!msgs.children.length) {
      addMsg('Hi! I’m your portfolio assistant. Ask me about skills, experience, or projects.');
    }

    send.addEventListener('click', () => {
      ask(input.value);
      input.value = '';
      input.focus();
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        ask(input.value);
        input.value = '';
      }
    });

    document.querySelectorAll('.cb-quick button').forEach((button) => {
      button.addEventListener('click', () => ask(button.dataset.q || ''));
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
