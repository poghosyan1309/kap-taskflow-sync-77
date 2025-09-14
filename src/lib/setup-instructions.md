# Կարգավորման հրահանգներ / Setup Instructions

## 1. Supabase SQL Editor-ում գործարկեք հետևյալ հրամանը

Մուտք գործեք ձեր Supabase dashboard և SQL Editor բաժնում գործարկեք `src/lib/database-setup.sql` ֆայլի բովանդակությունը:

## 2. Ստեղծեք օգտատերերի հաշիվներ

### Ադմինիստրատորի հաշիվ:
Supabase Authentication բաժնում ստեղծեք նոր օգտատեր՝
- Email: admin@kapan.am
- Password: [ձեր գաղտնաբառը]

Այնուհետև SQL Editor-ում գործարկեք՝
```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Ադմինիստրատոր'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@kapan.am');
```

### Ծառայությունների օգտատերերի հաշիվներ:
Յուրաքանչյուր ծառայության համար ստեղծեք օգտատեր և կապեք համապատասխան ծառայությանը:

Օրինակ՝ Երկրաբանական ծառայության համար:
1. Ստեղծեք օգտատեր՝ geology@kapan.am
2. SQL Editor-ում գործարկեք՝
```sql
UPDATE profiles 
SET service_id = (SELECT id FROM services WHERE name = 'Երկրաբանական ծառայություն'),
    full_name = 'Երկրաբանական ծառայություն',
    role = 'service_user'
WHERE id = (SELECT id FROM auth.users WHERE email = 'geology@kapan.am');
```

## 3. Մուտք գործելու տվյալներ

### Ադմինիստրատոր:
- URL: /auth
- Email: admin@kapan.am
- Password: [ձեր ստեղծած գաղտնաբառը]

### Ծառայություններ:
- URL: /service/login
- Email: [ծառայության email]
- Password: [ձեր ստեղծած գաղտնաբառը]