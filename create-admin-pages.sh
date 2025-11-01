#!/bin/bash

# Create directory structure and pages for RADIATE Admin Panel

# KONTEN EDUKASI
mkdir -p src/app/admin/edu/contents/new
mkdir -p src/app/admin/edu/categories
mkdir -p src/app/admin/edu/faq/new
mkdir -p src/app/admin/edu/references
mkdir -p src/app/admin/mythbuster/new

# SIMULASI & PELATIHAN
mkdir -p src/app/admin/simudose/history
mkdir -p src/app/admin/simudose/templates
mkdir -p src/app/admin/oncocase/new
mkdir -p src/app/admin/oncocase/keys
mkdir -p src/app/admin/oncocase/analytics
mkdir -p src/app/admin/minilab/packages
mkdir -p src/app/admin/minilab/results

# PETA PENGETAHUAN (OncoMap)
mkdir -p src/app/admin/oncomap/side-effects
mkdir -p src/app/admin/map/techniques
mkdir -p src/app/admin/map/clinical-notes

# PERJALANAN PASIEN
mkdir -p src/app/admin/journey/pre-treatment
mkdir -p src/app/admin/journey/follow-up
mkdir -p src/app/admin/side-effects/care
mkdir -p src/app/admin/side-effects/red-flags

# DATA & VISUALISASI
mkdir -p src/app/admin/data/outcomes
mkdir -p src/app/admin/data/validation
mkdir -p src/app/admin/therapy-table/combinations

# LAPORAN
mkdir -p src/app/admin/reports/education
mkdir -p src/app/admin/reports/training
mkdir -p src/app/admin/reports/simulation
mkdir -p src/app/admin/reports/export

# GOOGLE SHEETS
mkdir -p src/app/admin/sheets/mapping/eduradi
mkdir -p src/app/admin/sheets/mapping/mythbuster
mkdir -p src/app/admin/sheets/mapping/simudose
mkdir -p src/app/admin/sheets/mapping/oncocase
mkdir -p src/app/admin/sheets/mapping/oar
mkdir -p src/app/admin/sheets/mapping/journey
mkdir -p src/app/admin/sheets/mapping/side-effects
mkdir -p src/app/admin/sheets/mapping/cancer
mkdir -p src/app/admin/sheets/mapping/therapy
mkdir -p src/app/admin/sheets/validation
mkdir -p src/app/admin/sheets/templates

# PENGGUNA & PERAN
mkdir -p src/app/admin/users/roles
mkdir -p src/app/admin/users/audit

# PENGATURAN
mkdir -p src/app/admin/settings/branding
mkdir -p src/app/admin/settings/localization
mkdir -p src/app/admin/settings/privacy
mkdir -p src/app/admin/settings/integrations
mkdir -p src/app/admin/settings/backup

# BANTUAN
mkdir -p src/app/admin/help/sop
mkdir -p src/app/admin/help/ethics

echo "All directories created successfully!"
