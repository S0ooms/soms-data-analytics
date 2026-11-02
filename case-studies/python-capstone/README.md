# Python Capstone — Sales Performance & Customer Insights

A static S.O.M.S. portfolio case study and reproducible Option A Jupyter analysis of synthetic retail/e-commerce training data.

**Live-site path:** `case-studies/python-capstone/`  
**Entry page:** `index.html`  
**Case study style:** original S.O.M.S. dark-navy / warm-gold / Poppins theme  
**Main question:** “How is the store performing, and what drives revenue?”

## Project deliverables

- `index.html`, `style.css`, `script.js` — complete responsive case-study website, including contents navigation, six-chart filters and image enlargement.
- `assets/dashboard.png` — validated 1920 × 1080 dashboard screenshot.
- `assets/*-revenue.png`, `assets/top10-products.png`, `assets/customer-spend.png`, `assets/cancellation-trend.png` — six exported analysis charts.
- `downloads/Option_A_Sales_Analysis.ipynb` — public-friendly notebook copy with relative project-path detection and the final written insight cells converted to Markdown.
- `downloads/Executive_Summary.txt` — ten executive summary bullets.
- `downloads/One_Page_Insights_Summary.md` — eight insights and exactly two recommendations.
- `Data/Cleaned/cleaned_*.csv` — all seven cleaned datasets, including the two specifically requested CSV deliverables.
- `Data/Raw/*.csv` — all seven synthetic source files required to rerun the notebook.
- `Data/README_DATA_DICTIONARY.txt` — source dictionary provided with the training dataset.

## Results

| KPI | Result |
|---|---:|
| Eligible merchandise revenue | PHP 4,383,742.63 |
| Eligible Completed orders | 9,612 |
| AOV | PHP 456.07 |
| Cleaned order-item fact rows | 37,501 |
| Matched customers | 4,276 |
| Cancelled cleaned orders | 1,235 / 15,000 (8.23%) |

**Sales method:** `quantity × unit_price_at_purchase × (1 − discount_pct)`, excluding shipping, before refunds. Only Completed orders without unusable item-level quantities/prices enter the sales KPI population. This definition is disclosed in the case study.

## Reproduce in Jupyter

1. Clone/download the repository.
2. Open a terminal in `case-studies/python-capstone`.
3. Install packages: `python -m pip install -r requirements.txt`.
4. Launch Jupyter: `jupyter notebook` or `jupyter lab`.
5. Open `downloads/Option_A_Sales_Analysis.ipynb` and use **Restart & Run All**.
6. The notebook searches the current directory and its parents for `Data/Raw`, so it does not depend on the original author's Windows path.
7. Running the notebook recreates cleaned data, audit logs, charts, and the sales fact table under the case-study folder. Existing exports may be overwritten.

The supplied notebook is an edited-for-publication copy, not a modification of the author's original local notebook. Two final text cells that had mistakenly been stored as Python Code cells were converted to Markdown so they no longer produce SyntaxError.

## Integrate with the main portfolio

Replace only the existing **Python Capstone** `<article class="project-card">` inside the main repository's `index.html` capstone slider, using the separately supplied `homepage_python_card_snippet.html`. Keep the existing main-site `style.css` and `script.js` unchanged. The main site already has a `#capstoneSlider` instance.

**Important:** The capstone brief separately requests a submission PDF created in Word and saved as PDF. The HTML case-study page does not replace that submission requirement. The source brief is labeled confidential/proprietary and is deliberately **not** bundled for public GitHub publication.

**Data note:** The supplied dataset dictionary explicitly describes the training data as synthetic and safe for public use. Always independently verify permission before uploading different datasets.
