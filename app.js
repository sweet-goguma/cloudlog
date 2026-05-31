const STORAGE_KEY = "my-drama-archive-v1";

const TYPE_LABELS = { drama: "Drama", movie: "Movie" };
const COUNTRY_LABELS = {
  korea: "🇰🇷 KOREA",
  japan: "🇯🇵 JAPAN",
  china: "🇨🇳 CHINA",
  taiwan: "🇹🇼 TAIWAN",
  uk: "🇬🇧 UK",
  usa: "🇺🇸 USA",
  other: "ETC",
  western: "🌐 English", // 이전 데이터 호환
};

const COUNTRY_NAMES = {
  korea: "KOREA", japan: "JAPAN", china: "CHINA",
  taiwan: "TAIWAN", uk: "UK", usa: "USA",
  other: "ETC", western: "English",
};

// 서브 카테고리 필터 그룹 (china=china+taiwan, western=western+uk+usa)
const COUNTRY_GROUP = {
  korea:   e => e.country === "korea",
  japan:   e => e.country === "japan",
  china:   e => e.country === "china" || e.country === "taiwan",
  western: e => e.country === "western" || e.country === "uk" || e.country === "usa",
  other:   e => e.country === "other",
};

const CLOUD_PATH = `M23.8299 23.4333H12.0277C8.9739 23.4786 6.02031 22.344 3.78222 20.2658C1.54414 18.1876 0.194128 15.326 0.0134149 12.2772C-0.0624645 10.6928 0.184144 9.10953 0.738295 7.62331C1.29245 6.13708 2.1426 4.77884 3.23723 3.63091C4.33186 2.48298 5.64818 1.56927 7.10641 0.945141C8.56463 0.321013 10.1344 -0.000529251 11.7206 6.53899e-07C14.2865 0.00950854 16.7791 0.857247 18.8187 2.41415C20.8584 3.97104 22.3334 6.15181 23.0192 8.62442C24.2029 8.46024 25.4086 8.58169 26.5358 8.9786C27.6629 9.37552 28.6787 10.0364 29.4982 10.906C30.1994 11.6486 30.7387 12.5286 31.0821 13.4904C31.4255 14.4522 31.5655 15.4749 31.4932 16.4936C31.3304 18.4051 30.4493 20.1838 29.0273 21.4716C27.6053 22.7593 25.7481 23.4603 23.8299 23.4333ZM1.59516 12.2059C1.75864 14.8472 2.93431 17.3237 4.87753 19.12C6.82074 20.9163 9.38181 21.8942 12.0277 21.85H23.8299C25.3468 21.8767 26.8174 21.3275 27.9454 20.3129C29.0733 19.2984 29.7748 17.894 29.9083 16.3827C29.9698 15.4734 29.8182 14.5623 29.4656 13.7218C29.1131 12.8813 28.5693 12.1347 27.8775 11.5413C27.1857 10.9479 26.365 10.5241 25.4807 10.3036C24.5963 10.0831 23.6727 10.0719 22.7833 10.2711L22.4667 10.3439L22.0407 10.1428C21.9312 10.0731 21.8366 9.98234 21.7624 9.8758C21.6883 9.76926 21.6359 9.64907 21.6085 9.52217C21.1039 7.2742 19.8507 5.2643 18.0542 3.82191C16.2577 2.37953 14.0245 1.59021 11.7206 1.58333C10.348 1.58278 8.98971 1.86107 7.72797 2.40131C6.46623 2.94155 5.3274 3.73248 4.38055 4.72611C3.4337 5.71975 2.69857 6.89539 2.21977 8.18169C1.74097 9.468 1.52847 10.8382 1.59516 12.2091V12.2059Z`;

// 외곽 실루엣만 (내부 구멍 subpath 제거) → 완전히 채워지는 구름 모양
const CLOUD_SOLID_PATH = `M23.8299 23.4333H12.0277C8.9739 23.4786 6.02031 22.344 3.78222 20.2658C1.54414 18.1876 0.194128 15.326 0.0134149 12.2772C-0.0624645 10.6928 0.184144 9.10953 0.738295 7.62331C1.29245 6.13708 2.1426 4.77884 3.23723 3.63091C4.33186 2.48298 5.64818 1.56927 7.10641 0.945141C8.56463 0.321013 10.1344 -0.000529251 11.7206 6.53899e-07C14.2865 0.00950854 16.7791 0.857247 18.8187 2.41415C20.8584 3.97104 22.3334 6.15181 23.0192 8.62442C24.2029 8.46024 25.4086 8.58169 26.5358 8.9786C27.6629 9.37552 28.6787 10.0364 29.4982 10.906C30.1994 11.6486 30.7387 12.5286 31.0821 13.4904C31.4255 14.4522 31.5655 15.4749 31.4932 16.4936C31.3304 18.4051 30.4493 20.1838 29.0273 21.4716C27.6053 22.7593 25.7481 23.4603 23.8299 23.4333Z`;

const EMPTY_CLOUD_SVG = `<svg class="empty-cloud" viewBox="0 0 42.5011 27.9945" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M38.057 26.4945C45.413 20.1865 37.629 11.7265 29.545 11.7265C23.851 -10.4375 -9.55105 7.8945 5.25095 24.6005" stroke="#bbc4cd" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const OTT_LOGOS = {
  "Netflix":      "assets/ott/netflix.png",
  "TVING":        "assets/ott/tving.png",
  "Disney+":      "assets/ott/disney.png",
  "WATCHA":       "assets/ott/watcha.png",
  "Coupang Play": "assets/ott/coupang.png",
  "WeTV":         "assets/ott/wetv.png",
  "IQIYI":        "assets/ott/iqiyi.png",
  "YOUKU":        "assets/ott/youku.svg",
};

const BLOB_PATH = `M118.019 12.993C134.9 5.62708 154.504 1.99976 175.413 3.23907C193.053 4.28467 209.764 8.68455 224.694 15.659C261.439 4.82466 297.312 12.5126 321.065 40.6395C346.315 70.54 352.059 116.659 340.242 162.996C349.417 185.014 354.088 210.922 352.785 238.651C351.591 264.075 345.518 287.968 335.852 308.736C352.676 359.566 348.497 412.061 320.73 444.942C296.856 473.212 260.739 480.834 223.798 469.755C209.096 476.489 192.701 480.736 175.412 481.761C154.831 482.98 135.516 479.484 118.816 472.349C85.2093 479.575 53.1043 470.998 31.254 445.125C2.54211 411.126 -0.952416 356.156 17.9181 303.741C9.54979 284.172 4.31455 262.06 3.21497 238.651C2.00903 212.976 5.923 188.862 13.7921 167.952C0.194851 119.908 5.40511 71.4625 31.589 40.4568C53.1937 14.8741 84.8245 6.2001 118.019 12.993Z`;

const state = {
  entries: [],
  selectedRating: 0,
  ottOrder: [],
  filters: { type: "all", country: "all", search: "", ott: "all", sort: "recent" },
};

const elements = {
  archiveGrid: document.getElementById("archiveGrid"),
  emptyState: document.getElementById("emptyState"),
  subNav: document.getElementById("subNav"),
  drawer: document.getElementById("entryDrawer"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  drawerTitle: document.getElementById("drawerTitle"),
  form: document.getElementById("entryForm"),
  entryId: document.getElementById("entryId"),
  posterData: document.getElementById("posterData"),
  typeInput: document.getElementById("typeInput"),
  countryInput: document.getElementById("countryInput"),
  posterInput: document.getElementById("posterInput"),
  posterPreview: document.getElementById("posterPreview"),
  posterPlaceholder: document.getElementById("posterPlaceholder"),
  titleInput: document.getElementById("titleInput"),
  actorsInput: document.getElementById("actorsInput"),
  summaryInput: document.getElementById("summaryInput"),
  quote1Input: document.getElementById("quote1Input"),
  quote2Input: document.getElementById("quote2Input"),
  memoInput: document.getElementById("memoInput"),
  ratingInput: document.getElementById("ratingInput"),
  ratingDisplay: document.getElementById("ratingDisplay"),
  openCreateButton: document.getElementById("openCreateButton"),
  resetFormButton: document.getElementById("resetFormButton"),
  searchInput: document.getElementById("searchInput"),
  ottDropdown: document.getElementById("ottDropdown"),
  sortDropdown: document.getElementById("sortDropdown"),
  ottValue: document.getElementById("ottValue"),
  sortValue: document.getElementById("sortValue"),
  detailModal: document.getElementById("detailModal"),
  detailContent: document.getElementById("detailContent"),
  closeDetailButton: document.getElementById("closeDetailButton"),
  editFromDetailBtn: document.getElementById("editFromDetailBtn"),
  deleteFromDetailBtn: document.getElementById("deleteFromDetailBtn"),
  toast: document.getElementById("toast"),
};

function init() {
  state.entries = loadEntries();
  bindEvents();
  updateRatingUI();
  render();
}

function bindEvents() {
  elements.openCreateButton.addEventListener("click", () => openDrawer());
  elements.resetFormButton.addEventListener("click", resetForm);
  document.getElementById("closeFormButton").addEventListener("click", closeDrawer);
  elements.form.addEventListener("submit", handleSubmit);
  elements.posterInput.addEventListener("change", handlePosterUpload);

  // OTT FIFO: 3번째 선택 시 가장 먼저 선택된 항목 자동 해제
  elements.form.addEventListener("change", event => {
    const input = event.target.closest("input[name='ott']");
    if (!input) return;
    if (input.checked) {
      state.ottOrder.push(input.value);
      if (state.ottOrder.length > 2) {
        const toRemove = state.ottOrder.shift();
        const toRemoveInput = [...elements.form.querySelectorAll("input[name='ott']")]
          .find(i => i.value === toRemove);
        if (toRemoveInput) toRemoveInput.checked = false;
      }
    } else {
      const idx = state.ottOrder.indexOf(input.value);
      if (idx > -1) state.ottOrder.splice(idx, 1);
    }
  });

  elements.drawerBackdrop.addEventListener("click", closeDrawer);

  // 폼 카드 바깥 영역 클릭 시 닫기
  elements.drawer.addEventListener("click", event => {
    if (!document.body.contains(event.target)) return;
    if (!event.target.closest(".form-card")) closeDrawer();
  });

  elements.searchInput.addEventListener("input", event => {
    state.filters.search = event.target.value.trim().toLowerCase();
    render();
  });

  // 커스텀 드롭다운 이벤트 바인딩
  bindCustomDropdown(elements.ottDropdown, elements.ottValue, (value) => {
    state.filters.ott = value;
    render();
  });
  bindCustomDropdown(elements.sortDropdown, elements.sortValue, (value) => {
    state.filters.sort = value;
    render();
  });

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", event => {
    if (!event.target.closest(".custom-select")) {
      document.querySelectorAll(".custom-select.open").forEach(d => d.classList.remove("open"));
    }
  });

  elements.closeDetailButton.addEventListener("click", closeDetail);
  elements.editFromDetailBtn.addEventListener("click", () => {
    const id = elements.editFromDetailBtn.dataset.editId;
    if (!id) return;
    const entry = findEntry(id);
    if (entry) { closeDetail(); openDrawer(entry); }
  });
  elements.deleteFromDetailBtn.addEventListener("click", () => {
    const id = elements.deleteFromDetailBtn.dataset.deleteId;
    if (!id) return;
    deleteEntry(id);
  });

  document.querySelector("[data-action='show-all']").addEventListener("click", () => {
    state.filters.type = "all";
    state.filters.country = "all";
    state.filters.ott = "all";
    state.filters.search = "";
    state.filters.sort = "recent";
    elements.searchInput.value = "";
    resetCustomDropdown(elements.ottDropdown, elements.ottValue, "all", "OTT");
    resetCustomDropdown(elements.sortDropdown, elements.sortValue, "recent", "최근 등록순");
    closeAllDropdowns();
    updateNavTabs();
    render();
  });

  document.querySelectorAll(".nav-tab").forEach(button => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      state.filters.type = type;
      state.filters.country = "all"; // 메인 탭 클릭 시 항상 전체 리셋

      if (type === "all") {
        closeAllDropdowns();
      } else {
        const group = button.closest(".nav-tab-group");
        const isOpen = group?.classList.contains("open");
        closeAllDropdowns();
        if (!isOpen) group?.classList.add("open"); // 토글: 열려있으면 닫기, 닫혀있으면 열기
      }

      updateFilterButtons();
      render();
    });
  });

  document.querySelectorAll(".sub-tab").forEach(button => {
    button.addEventListener("click", () => {
      state.filters.country = button.dataset.country;
      closeAllDropdowns(); // 선택 후 드롭다운 닫기
      updateSubTabActive(button.dataset.country);
      render();
    });
  });

  // FORMAT 토글
  document.querySelectorAll("[data-type-val]").forEach(btn => {
    btn.addEventListener("click", () => setFormType(btn.dataset.typeVal));
  });

  // COUNTRY 토글
  document.querySelectorAll("[data-country-val]").forEach(btn => {
    btn.addEventListener("click", () => setFormCountry(btn.dataset.countryVal));
  });

  elements.ratingInput.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("mousemove", event => {
      const x = event.clientX - button.getBoundingClientRect().left;
      renderRatingClouds(x < button.offsetWidth / 2 ? index + 0.5 : index + 1);
    });
    button.addEventListener("mouseleave", () => renderRatingClouds(state.selectedRating));
    button.addEventListener("click", event => {
      const x = event.clientX - button.getBoundingClientRect().left;
      const newRating = x < button.offsetWidth / 2 ? index + 0.5 : index + 1;
      state.selectedRating = state.selectedRating === newRating ? 0 : newRating;
      updateRatingUI();
    });
  });

  elements.ratingInput.addEventListener("mouseleave", () => renderRatingClouds(state.selectedRating));

  elements.ratingDisplay.addEventListener("input", () => {
    const val = parseFloat(elements.ratingDisplay.value);
    if (isNaN(val)) return;
    const clamped = Math.min(5, Math.max(0, Math.round(val * 2) / 2));
    state.selectedRating = clamped;
    renderRatingClouds(clamped);
  });

  elements.ratingDisplay.addEventListener("blur", () => {
    const val = parseFloat(elements.ratingDisplay.value);
    const clamped = isNaN(val) ? 0 : Math.min(5, Math.max(0, Math.round(val * 2) / 2));
    state.selectedRating = clamped;
    elements.ratingDisplay.value = String(clamped);
    renderRatingClouds(clamped);
  });

  elements.archiveGrid.addEventListener("click", event => {
    const cardButton = event.target.closest("[data-card-id]");
    if (!cardButton) return;
    openDetail(cardButton.dataset.cardId);
  });

  elements.detailModal.addEventListener("click", event => {
    if (event.target.dataset.action === "close-detail") closeDetail();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeDrawer(); closeDetail(); }
  });
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeEntry) : [];
  } catch (error) {
    console.error("기록을 불러오지 못했습니다.", error);
    return [];
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
}

function normalizeEntry(entry) {
  return {
    id: String(entry.id || createId()),
    title: String(entry.title || "제목 없음"),
    type: entry.type === "movie" ? "movie" : "drama",
    country: ["korea","japan","china","taiwan","uk","usa","other","western"].includes(entry.country) ? entry.country : "other",
    poster: String(entry.poster || ""),
    actors: String(entry.actors || ""),
    rating: Math.min(5, Math.max(0, Number(entry.rating || 0))),
    summary: String(entry.summary || ""),
    quote: String(entry.quote || ""),
    scene: String(entry.scene || ""),
    ott: Array.isArray(entry.ott) ? entry.ott.map(String) : [],
    memo: String(entry.memo || ""),
    highlight: String(entry.highlight || ""),
    highlightName: String(entry.highlightName || ""),
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || new Date().toISOString(),
  };
}

function createId() {
  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function render() {
  const filteredEntries = getFilteredEntries();
  renderCards(filteredEntries);
  const showGrid = filteredEntries.length > 0;
  elements.emptyState.classList.toggle("hidden", showGrid);
  elements.archiveGrid.classList.toggle("hidden", !showGrid);
}

function getFilteredEntries() {
  const search = state.filters.search;
  return [...state.entries]
    .filter(e => state.filters.type === "all" || e.type === state.filters.type)
    .filter(e => {
      if (state.filters.country === "all") return true;
      const groupFn = COUNTRY_GROUP[state.filters.country];
      return groupFn ? groupFn(e) : e.country === state.filters.country;
    })
    .filter(e => state.filters.ott === "all" || e.ott.includes(state.filters.ott))
    .filter(e => {
      if (!search) return true;
      return [e.title, e.actors, e.summary, e.quote, e.memo, TYPE_LABELS[e.type], e.ott.join(" ")]
        .join(" ").toLowerCase().includes(search);
    })
    .sort((a, b) => {
      if (state.filters.sort === "rating") return b.rating - a.rating;
      if (state.filters.sort === "title") return a.title.localeCompare(b.title, "ko");
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

function cloudSvg(fillState, size = 26) {
  const active = "#95C5D4";
  const vb = "-1 -1 33.5117 25.4346";
  if (fillState >= 1) {
    return `<svg class="card-cloud-icon" width="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${CLOUD_SOLID_PATH}" fill="${active}"/></svg>`;
  }
  if (fillState >= 0.5) {
    const id = `cc${size}${Math.random().toString(36).slice(2, 6)}`;
    return `<svg class="card-cloud-icon" width="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="${id}"><rect x="0" y="0" width="15.756" height="24"/></clipPath></defs><path d="${CLOUD_SOLID_PATH}" fill="none" stroke="${active}" stroke-width="1.5"/><path d="${CLOUD_SOLID_PATH}" fill="${active}" clip-path="url(#${id})"/></svg>`;
  }
  return `<svg class="card-cloud-icon empty" width="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${CLOUD_SOLID_PATH}" fill="none" stroke="${active}" stroke-width="1.5"/></svg>`;
}

function renderClouds(rating, size) {
  return Array.from({ length: 5 }, (_, i) => {
    const pos = i + 1;
    const fill = rating >= pos ? 1 : rating >= pos - 0.5 ? 0.5 : 0;
    return cloudSvg(fill, size);
  }).join("");
}

function ratingCloudSvg(fillState, id) {
  const active = "#95C5D4";
  const vb = "-1 -1 33.5117 25.4346";
  if (fillState >= 1) {
    return `<svg viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${CLOUD_SOLID_PATH}" fill="${active}"/></svg>`;
  }
  if (fillState >= 0.5) {
    return `<svg viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="rc${id}"><rect x="0" y="0" width="15.756" height="24"/></clipPath></defs><path d="${CLOUD_SOLID_PATH}" fill="none" stroke="${active}" stroke-width="1.5"/><path d="${CLOUD_SOLID_PATH}" fill="${active}" clip-path="url(#rc${id})"/></svg>`;
  }
  return `<svg viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${CLOUD_SOLID_PATH}" fill="none" stroke="${active}" stroke-width="1.5"/></svg>`;
}

function renderRatingClouds(rating) {
  elements.ratingInput.querySelectorAll("button").forEach((btn, i) => {
    const pos = i + 1;
    const fill = rating >= pos ? 1 : rating >= pos - 0.5 ? 0.5 : 0;
    btn.innerHTML = ratingCloudSvg(fill, i);
  });
}

function renderCards(entries) {
  if (entries.length === 0) {
    elements.archiveGrid.innerHTML = "";
    return;
  }

  elements.archiveGrid.innerHTML = entries.map(entry => `
    <article class="work-card">
      <button class="card-btn" type="button" data-card-id="${escapeAttribute(entry.id)}" aria-label="${escapeAttribute(entry.title)} 상세 보기">
        <div class="card-blob-wrap">
          <svg class="card-blob-svg" viewBox="0 0 356 485" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="${BLOB_PATH}" fill="white" stroke="#95C5D4" stroke-width="2.5"/>
          </svg>
          <div class="card-poster">
            ${entry.poster
              ? `<img src="${entry.poster}" alt="${escapeAttribute(entry.title)} 포스터" />`
              : `<div class="card-poster-fallback">${escapeHTML(entry.title)}</div>`
            }
          </div>
          <div class="card-rating" aria-label="구름 평점 ${entry.rating}점">
            ${renderClouds(entry.rating)}
          </div>
          <div class="card-ott">
            ${entry.ott.filter(o => OTT_LOGOS[o]).map(o => `<img src="${OTT_LOGOS[o]}" alt="${escapeAttribute(o)}" class="card-ott-logo" />`).join("")}
          </div>
        </div>
      </button>
    </article>
  `).join("");
}

function openDrawer(entry = null) {
  resetForm();

  if (entry) {
    elements.drawerTitle.textContent = "EDIT CLOUD";
    elements.entryId.value = entry.id;
    elements.titleInput.value = entry.title;
    elements.actorsInput.value = entry.actors;
    elements.summaryInput.value = entry.summary;
    elements.memoInput.value = entry.memo;
    elements.posterData.value = entry.poster;
    state.selectedRating = entry.rating || 0;
    setPosterPreview(entry.poster);
    setCheckedOtt(entry.ott);

    // 명대사 2분할
    const quotes = (entry.quote || "").split("").filter(Boolean);
    elements.quote1Input.value = quotes[0] || "";
    elements.quote2Input.value = quotes[1] || "";

    setFormType(entry.type);
    setFormCountry(entry.country);
  } else {
    elements.drawerTitle.textContent = "NEW CLOUD";
    state.selectedRating = 0;
  }

  updateRatingUI();
  elements.drawer.classList.add("open");
  elements.drawer.setAttribute("aria-hidden", "false");
  elements.drawerBackdrop.classList.remove("hidden");
  setTimeout(() => elements.titleInput.focus(), 80);
}

function closeDrawer() {
  elements.drawer.classList.remove("open");
  elements.drawer.setAttribute("aria-hidden", "true");
  elements.drawerBackdrop.classList.add("hidden");
}

function resetForm() {
  elements.form.reset();
  elements.entryId.value = "";
  elements.posterData.value = "";
  state.selectedRating = 0;
  state.ottOrder = [];
  setPosterPreview("");

  // 기본값 복원
  setFormType("drama");
  setFormCountry("korea");

  updateRatingUI();
}

function handleSubmit(event) {
  event.preventDefault();

  const now = new Date().toISOString();
  const id = elements.entryId.value || createId();
  const existingEntry = findEntry(id);

  const quotes = [
    elements.quote1Input.value.trim(),
    elements.quote2Input.value.trim(),
  ].filter(Boolean).join("");

  const entry = {
    id,
    title: elements.titleInput.value.trim(),
    type: elements.typeInput.value,
    country: elements.countryInput.value,
    poster: elements.posterData.value,
    actors: elements.actorsInput.value.trim(),
    rating: state.selectedRating,
    summary: elements.summaryInput.value.trim(),
    quote: quotes,
    scene: "",
    ott: getCheckedOtt(),
    memo: elements.memoInput.value.trim(),
    highlight: "",
    highlightName: "",
    createdAt: existingEntry?.createdAt || now,
    updatedAt: now,
  };

  if (!entry.title) {
    showToast("제목을 입력해주세요.");
    elements.titleInput.focus();
    return;
  }

  if (existingEntry) {
    state.entries = state.entries.map(item => item.id === id ? entry : item);
    showToast("작품 정보가 수정됐어요.");
  } else {
    const duplicate = state.entries.find(e => e.title.trim().toLowerCase() === entry.title.trim().toLowerCase());
    if (duplicate) {
      const proceed = window.confirm(`'${entry.title}'은(는) 이미 등록된 작품이에요.\n그래도 등록하시겠어요?`);
      if (!proceed) return;
    }
    state.entries.unshift(entry);
    showToast("구름 속에 작품을 저장했어요.");
  }

  saveEntries();
  render();
  closeDrawer();
}

function handlePosterUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("이미지 파일만 첨부할 수 있어요.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const result = String(reader.result || "");
    elements.posterData.value = result;
    setPosterPreview(result);
  };
  reader.onerror = () => showToast("포스터 이미지를 불러오지 못했어요.");
  reader.readAsDataURL(file);
}

function setPosterPreview(src) {
  const uploader = elements.posterPreview.closest(".poster-uploader");
  if (src) {
    elements.posterPreview.src = src;
    elements.posterPreview.classList.remove("hidden");
    elements.posterPlaceholder.classList.add("hidden");
    uploader?.classList.add("has-image");
  } else {
    elements.posterPreview.removeAttribute("src");
    elements.posterPreview.classList.add("hidden");
    elements.posterPlaceholder.classList.remove("hidden");
    uploader?.classList.remove("has-image");
  }
}


function updateRatingUI() {
  renderRatingClouds(state.selectedRating);
  if (document.activeElement !== elements.ratingDisplay) {
    elements.ratingDisplay.value = String(state.selectedRating);
  }
}

function bindCustomDropdown(dropdown, valueEl, onChange) {
  const btn = dropdown.querySelector(".custom-select-btn");
  const options = dropdown.querySelectorAll(".custom-option");

  btn.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    document.querySelectorAll(".custom-select.open").forEach(d => d.classList.remove("open"));
    if (!isOpen) dropdown.classList.add("open");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      const value = opt.dataset.value;
      const label = opt.textContent;
      valueEl.textContent = label;
      options.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      dropdown.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      onChange(value);
    });
  });
}

function resetCustomDropdown(dropdown, valueEl, value, label) {
  valueEl.textContent = label;
  dropdown.querySelectorAll(".custom-option").forEach(o => {
    o.classList.toggle("active", o.dataset.value === value);
  });
  dropdown.classList.remove("open");
}

function setFormType(val) {
  elements.typeInput.value = val;
  document.querySelectorAll("[data-type-val]").forEach(b => b.classList.toggle("active", b.dataset.typeVal === val));
}

function setFormCountry(val) {
  elements.countryInput.value = val;
  document.querySelectorAll("[data-country-val]").forEach(b => b.classList.toggle("active", b.dataset.countryVal === val));
}

function getCheckedOtt() {
  return [...elements.form.querySelectorAll("input[name='ott']:checked")].map(input => input.value);
}

function setCheckedOtt(ottList) {
  state.ottOrder = [...ottList];
  elements.form.querySelectorAll("input[name='ott']").forEach(input => {
    input.checked = ottList.includes(input.value);
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".nav-tab-group").forEach(g => g.classList.remove("open"));
}

function updateNavTabs() {
  document.querySelectorAll(".nav-tab").forEach(button => {
    const isActive = button.dataset.type === state.filters.type;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function updateSubTabActive(country) {
  document.querySelectorAll(".sub-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.country === country);
  });
}

function updateFilterButtons() {
  updateNavTabs();
  updateSubTabActive(state.filters.country);
  // .open 클래스는 nav-tab 클릭 핸들러에서만 관리
}

function openDetail(id) {
  const entry = findEntry(id);
  if (!entry) return;

  elements.editFromDetailBtn.dataset.editId = entry.id;
  elements.deleteFromDetailBtn.dataset.deleteId = entry.id;

  const quotes = (entry.quote || "").split("").filter(Boolean);
  const quotesHtml = quotes.length
    ? quotes.map((q, i) => `<span class="quote-line"><span class="quote-num">${i + 1}.</span><span class="quote-text">${escapeHTML(q)}</span></span>`).join("")
    : "등록된 명대사가 없어요.";

  elements.detailContent.innerHTML = `
    <div class="detail-left">
      <div class="detail-poster-wrap">
        ${entry.poster
          ? `<img src="${entry.poster}" alt="${escapeAttribute(entry.title)} 포스터" />`
          : `<div class="detail-poster-placeholder">포스터 이미지</div>`
        }
      </div>
      <div class="detail-clouds-row" aria-label="구름 평점 ${entry.rating}점">
        ${renderClouds(entry.rating, 35)}
      </div>
    </div>

    <div class="detail-right">
      <div class="detail-badges">
        <span class="detail-badge">${TYPE_LABELS[entry.type]}</span>
        <span class="detail-badge">${escapeHTML(COUNTRY_NAMES[entry.country] || entry.country)}</span>
        ${entry.ott.map(ott => {
          const logo = OTT_LOGOS[ott];
          return logo
            ? `<span class="detail-badge detail-badge-ott"><img src="${escapeAttribute(logo)}" alt="${escapeAttribute(ott)}" class="detail-ott-logo" /></span>`
            : `<span class="detail-badge">${escapeHTML(ott)}</span>`;
        }).join("")}
      </div>

      <h2 class="detail-title" id="detailTitle">${escapeHTML(entry.title)}</h2>
      <p class="detail-subtitle">${escapeHTML(entry.actors || "배우 미입력")}</p>

      <div class="detail-section">
        <span class="detail-section-label">줄거리</span>
        <p>${escapeHTML(entry.summary || "등록된 줄거리가 없어요.")}</p>
      </div>

      <div class="detail-section quote-section">
        <span class="detail-section-label">명대사</span>
        <p>${quotesHtml}</p>
      </div>

      <div class="detail-section">
        <span class="detail-section-label">비고</span>
        <p>${escapeHTML(entry.memo || "등록된 메모가 없어요.")}</p>
      </div>

    </div>
  `;

  elements.detailModal.classList.remove("hidden");
}

function closeDetail() {
  elements.detailModal.classList.add("hidden");
}

function deleteEntry(id) {
  const entry = findEntry(id);
  if (!entry) return;

  const confirmed = window.confirm(`「${entry.title}」 기록을 삭제할까요?`);
  if (!confirmed) return;

  state.entries = state.entries.filter(item => item.id !== id);
  saveEntries();
  render();
  closeDetail();
  showToast("작품 기록을 삭제했어요.");
}

function findEntry(id) {
  return state.entries.find(entry => entry.id === id);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2200);
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
  } catch { return "-"; }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function escapeAttribute(value) { return escapeHTML(value); }

init();
