var displayHTMLs = {
    // Home
    "home-tab": `<p class="title is-1">
            Adnan Ahmad
            </p>
            <p class="subtitle is-6">🧠 Installing AI in my brain...</p>
            <p class="subtitle">
            Hey, I'm <strong>Adnan</strong> from <strong>New Delhi, India</strong>. I am <strong>18</strong> year old. Currently studying <strong>Electrical Engineering</strong> from G. B. Pant Institute of Technology. I would like to play <strong>virtual games</strong> rather than outdoor games.
            </p>
            <div class="tags">
            <span class="tag">Electrical Engineer</span>
            <span class="tag">Programmer</span>
            <span class="tag">Gamer</span>
            </div>`,
    // Works
    "works-tab": `
            <p class="title">Works</p>
            <p class="subtitle is-6">Apps, softwares and websites made by me.</p>
            <div class="icons large-icons">
            <a href="https://storage.viperadnan.cf"><img src="https://img.icons8.com/color/144/000000/movies-folder.png"/><div class="caption">Storage</div></a>
            <a href="https://vipercloud.ga"><img src="https://img.icons8.com/color/148/000000/cloud-storage.png"/><div class="caption">ViperCloud</div></a>
            <a href="#"><img src="https://img.icons8.com/cotton/128/000000/add-to-loud.png"/><div class="caption disabled">Add to Cloud</div></a>
            <a href="https://1337x.arnid.ga"><img src="https://img.icons8.com/dusk/144/000000/utorrent.png"/><div class="caption">1337x.to Proxy</div></a>
            <a href="https://arnid.ga"><img src="https://img.icons8.com/fluent/148/000000/cloud-firewall.png"/><div class="caption">Proxy Maker</div></a>
            <a href="https://musically.netlify.app"><img src="https://img.icons8.com/color/144/000000/musical--v1.png"/><div class="caption">Musically</div></a>
            <a href="https://booster.arnid.ga"><img src="https://img.icons8.com/fluent/150/000000/resume-website.png"/><div class="caption">Proxy Builder</div></a>
            <a href="https://tiiny.tk"><img src="https://img.icons8.com/color/148/000000/shorten-urls.png"/><div class="caption">URL Shortener</div></a>
            <a href="https://pasting.ga"><img src="https://img.icons8.com/color/148/000000/paste.png"/><div class="caption">Pastebin</div></a>
            <a href="https://t1.vipercloud.ga"><img src="https://img.icons8.com/fluent/148/000000/sent.png"/><div class="caption">Telegram Indexer</div></a>
            </div>`,
    // Resources
    "resources-tab": `
            <p class="title">Resources</p>
            <p class="subtitle is-6">Some other's useful apps, softwares or websites.</p>
            <div class="icons large-icons">
            <a href="https://carbon.now.sh"><img src="https://img.icons8.com/color/148/000000/carbon.png"/><div class="caption">Carbonizer</div></a>
            <a href="https://aws.rapidleech.gq"><img src="https://img.icons8.com/color/148/000000/fast-download.png"/><div class="caption">RapidLeech</div></a>
            <a href="https://convert-video-online.com/"><img src="https://img.icons8.com/color/148/000000/video-card.png"/><div class="caption">Video Converter</div></a>
            <a href="https://www.tubeoffline.com/download-OnLine-videos.php"><img src="https://img.icons8.com/color/148/000000/grab.png"/><div class="caption">Video Grabber</div></a>
            <a href="https://colab.research.google.com/github/biplobsd/OneClickRun/blob/master/OneClickRun.ipynb"><img src="https://img.icons8.com/dusk/148/000000/processor.png"/><div class="caption">OneClickRun</div></a>
            <a href="https://td.hackgence.com/"><img src="https://img.icons8.com/color/148/000000/network-drive.png"/><div class="caption">Create TeamDrive</div></a>
            </div>`,
    // Contact
    "contact-tab": `
            <p class="title">Contact
            <a href="https://www.google.com/search?q=viperadnan" class="tag">Google Me</a>
            </p>
            <p class="subtitle is-6">Feel free to get in touch with me, I am always open for discussing new projects, creative ideas or opportunities.</p>
            <div class="icons small-icons">
            <a href="https://facebook.com/viperadnan"><img src="https://img.icons8.com/color/148/000000/facebook-new.png"/><div class="caption">Facebook</div></a>
            <a href="https://instagram.com/viperadnan"><img src="https://img.icons8.com/color/150/000000/instagram-new--v2.png"/><div class="caption">Instagram</div></a>
            <a href="https://twitter.com/viperadn"><img src="https://img.icons8.com/color/148/000000/twitter-circled--v1.png"/><div class="caption">Twitter</div></a>
            <a href="https://t.me/viperadnan"><img src="https://img.icons8.com/color/148/000000/telegram-app.png"/><div class="caption">Telegram</div></a>
            <a href="https://github.com/viperadnan-git"><img src="https://img.icons8.com/fluent/148/000000/github.png"/><div class="caption">GitHub</div></a>
            <a href="#"><img src="https://img.icons8.com/color/148/000000/whatsapp.png"/><div class="caption disabled">WhatsApp</div></a>
            <a href="#"><img src="https://img.icons8.com/color/148/000000/linkedin-circled--v1.png"/><div class="caption disabled">Linkedin</div></a>
            <a href="#"><img src="https://img.icons8.com/color/148/000000/--tinder.png"/><div class="caption disabled">Tinder</div></a>
            <a href="https://youtube.com/viperadnan"><img src="https://img.icons8.com/color/148/000000/youtube-play.png"/><div class="caption">YouTube</div></a>
            <a href="mailto:viperadnan@gmail.com?cc=viperadnan@pm.me&subject=From%20Portfolio%3A"><img src="https://img.icons8.com/color/148/000000/gmail.png"/><div class="caption">EMail</div></a>
            </div>`,
};
$(document).ready(function () {
    var themeElements = $(".theme-color");
    var themeOptions = [
        {
            text: "Cyan",
            value: "is-primary",
        },
        {
            text: "Purple",
            value: "is-link",
        },
        {
            text: "Blue",
            value: "is-info",
        },
        {
            text: "Green",
            value: "is-success",
        },
        {
            text: "Red",
            value: "is-danger",
        },
        {
            text: "Yellow",
            value: "is-warning",
        },
        {
            text: "Dark",
            value: "is-dark",
        },
        {
            text: "Light",
            value: "is-light",
        },
        {
            text: "Black",
            value: "is-black",
        },
        {
            text: "White",
            value: "is-white",
        },
    ];
    var currentTheme =
        Cookies.get("theme") ||
        themeOptions[Math.floor(Math.random() * themeOptions.length)].value;
    themeElements.addClass(currentTheme);
    $.each(themeOptions, function (i, key) {
        $("#theme-menu").append(
            $("<option></option>").val(key.value).text(key.text)
        );
    });
    $(`#theme-menu option[value="${currentTheme}"]`).attr("selected", true);
    $('select[id="theme-menu"]').change(function () {
        let selectedTheme = $(this).val();
        themeElements.toggleClass(currentTheme);
        currentTheme = selectedTheme;
        Cookies.set("theme", currentTheme, {
            expires: 365,
        });
        themeElements.addClass(selectedTheme);
    });

    var tabId = Cookies.get("tab") || "home-tab";
    $("#display").html(displayHTMLs[tabId]);
    $("#tab-menu .navbar-item").click(function (event) {
        $("#tab-menu .navbar-item").removeClass("is-active");
        $(this).addClass("is-active");
        tabId = $(this).attr("id");
        $("#display").hide().html(displayHTMLs[tabId]).fadeIn("slow");
        Cookies.set("tab", tabId, {
            expires: 1,
        });
        $(".navbar-burger, .navbar-menu").removeClass("is-active");
    });

    $(".navbar-burger").click(function () {
        $(".navbar-burger, .navbar-menu").toggleClass("is-active");
    });
});
