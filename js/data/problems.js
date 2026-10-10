// مسائل PHP للحل
const TAGS={vars:"متغيرات",math:"عمليات حسابية",if:"if",switch:"switch",for:"for",while:"while",do:"do..while",nested:"حلقات متداخلة"};
const PROBS=[
 {t:"مساحة ومحيط المربع",lvl:"Lab 2",tags:["vars","math"],
  q:"عرّف متغيراً لطول ضلع مربع = 6، ثم احسب واطبع المساحة والمحيط بهذا الشكل:\nArea = ...\nPerimeter = ...",
  h:"المساحة = الضلع × الضلع، والمحيط = 4 × الضلع. استخدم <br> بين السطرين.",
  s:`<?php
$side = 6;
$area = $side * $side;
$perimeter = 4 * $side;
echo "Area = $area <br>";
echo "Perimeter = $perimeter";
?>`},
 {t:"تحويل درجة الحرارة",lvl:"Lab 2",tags:["vars","math"],
  q:"درجة الحرارة 35 مئوية. حوّلها إلى فهرنهايت واطبع النتيجة.\nالقانون: F = C × 1.8 + 32",
  h:"متغيرين فقط: واحد للمئوي وواحد للنتيجة.",
  s:`<?php
$c = 35;
$f = $c * 1.8 + 32;
echo "$c C = $f F";     // 95
?>`},
 {t:"فاتورة مشتريات",lvl:"Lab 2",tags:["vars","math"],
  q:"سعر القطعة 45 ريال والكمية 4. احسب: المجموع قبل الضريبة، وقيمة الضريبة 15%، والإجمالي بعد الضريبة.",
  h:"المجموع = السعر × الكمية. الضريبة = المجموع × 0.15. الإجمالي = المجموع + الضريبة.",
  s:`<?php
$price = 45; $qty = 4;
$subtotal = $price * $qty;        // 180
$tax = $subtotal * 0.15;          // 27
$total = $subtotal + $tax;        // 207
echo "Subtotal = $subtotal <br> Tax = $tax <br> Total = $total";
?>`},
 {t:"تحويل الدقائق",lvl:"Lab 2",tags:["vars","math"],
  q:"عندك 135 دقيقة. حوّلها إلى ساعات ودقائق واطبع: 2 hours and 15 minutes",
  h:"الساعات = القسمة الصحيحة على 60 (floor أو intdiv). الدقائق المتبقية = باقي القسمة %.",
  s:`<?php
$minutes = 135;
$hours = intdiv($minutes, 60);    // 2   أو floor($minutes / 60)
$rest  = $minutes % 60;           // 15
echo "$hours hours and $rest minutes";
?>`},
 {t:"القرض الشخصي",lvl:"Lab 2",tags:["vars","math"],
  q:"مبلغ القرض 60000 ريال، ونسبة الفائدة السنوية الثابتة 3%، والمدة 5 سنوات.\nاحسب واطبع: مبلغ الفائدة، والمبلغ الإجمالي الواجب سداده، والقسط الشهري.",
  h:"الفائدة = المبلغ × النسبة ÷ 100 × السنوات. الإجمالي = المبلغ + الفائدة. القسط = الإجمالي ÷ (السنوات × 12). ما تحتاج if ولا حلقة.",
  s:`<?php
$loan = 60000; $rate = 3; $years = 5;
$interest = $loan * $rate / 100 * $years;   // 9000
$total    = $loan + $interest;              // 69000
$monthly  = $total / ($years * 12);         // 1150
echo "Interest = $interest <br>";
echo "Total = $total <br>";
echo "Monthly = $monthly";
?>`},
 {t:"موجب أو سالب أو صفر",lvl:"Lab 3",tags:["vars","if"],
  q:"عرّف متغيراً لعدد، واطبع هل هو موجب أو سالب أو صفر.",
  h:"ثلاث حالات = if ثم elseif ثم else.",
  s:`<?php
$n = -7;
if ($n > 0)      echo "Positive";
elseif ($n < 0)  echo "Negative";
else             echo "Zero";
?>`},
 {t:"الأصغر من ثلاثة أعداد",lvl:"Lab 3",tags:["vars","if"],
  q:"عندك ثلاثة أعداد x و y و z. اطبع أصغرها بهذا الشكل: The smallest is ...",
  h:"إما شروط مع && لكل عدد، أو افترض أن الأصغر x ثم قارنه بالباقي.",
  s:`<?php
$x = 40; $y = 15; $z = 27;
$min = $x;
if ($y < $min) $min = $y;
if ($z < $min) $min = $z;
echo "The smallest is $min";
?>`},
 {t:"خصم الفاتورة",lvl:"Lab 3",tags:["vars","math","if"],
  q:"قيمة الفاتورة في متغير. إذا كانت 500 أو أكثر خصم 20%، وإذا من 200 إلى أقل من 500 خصم 10%، وأقل من 200 بدون خصم.\nاطبع قيمة الخصم والمبلغ بعد الخصم.",
  h:"حدد نسبة الخصم بـ if / elseif / else، ثم احسب بعدها مرة واحدة.",
  s:`<?php
$bill = 350;
if ($bill >= 500)      $discount = 0.20;
elseif ($bill >= 200)  $discount = 0.10;
else                   $discount = 0;
$amount = $bill * $discount;
echo "Discount = $amount <br> To pay = " . ($bill - $amount);
?>`},
 {t:"هل السنة كبيسة؟",lvl:"Lab 3",tags:["vars","if"],
  q:"السنة كبيسة إذا كانت تقبل القسمة على 4 ولا تقبل القسمة على 100، أو تقبل القسمة على 400. اطبع Leap year أو Not leap year.",
  h:"شرط واحد فيه && و ||، وتستخدم % == 0 للقابلية للقسمة.",
  s:`<?php
$year = 2024;
if (($year % 4 == 0 && $year % 100 != 0) || $year % 400 == 0)
    echo "$year is a leap year";
else
    echo "$year is not a leap year";
?>`},
 {t:"اسم اليوم",lvl:"Lab 3",tags:["vars","switch"],
  q:"متغير فيه رقم اليوم من 1 إلى 7 (1 = الأحد). اطبع اسم اليوم، وإذا الرقم غير صحيح اطبع Invalid day.",
  h:"قيمة واحدة تُقارن بقيم ثابتة = switch، ولا تنسى break وdefault.",
  s:`<?php
$day = 3;
switch ($day) {
    case 1: echo "Sunday"; break;
    case 2: echo "Monday"; break;
    case 3: echo "Tuesday"; break;
    case 4: echo "Wednesday"; break;
    case 5: echo "Thursday"; break;
    case 6: echo "Friday"; break;
    case 7: echo "Saturday"; break;
    default: echo "Invalid day";
}
?>`},
 {t:"آلة حاسبة",lvl:"Lab 3",tags:["vars","switch","if"],
  q:"عندك عددين ورمز عملية في متغير ($op = '/'). اطبع العملية والنتيجة مثل: 20 / 4 = 5\nوإذا كانت قسمة والعدد الثاني صفر اطبع: Cannot divide by zero",
  h:"switch على الرمز، وداخل حالة / تحتاج if للتحقق من الصفر.",
  s:`<?php
$a = 20; $b = 4; $op = '/';
switch ($op) {
    case '+': echo "$a + $b = " . ($a + $b); break;
    case '-': echo "$a - $b = " . ($a - $b); break;
    case '*': echo "$a * $b = " . ($a * $b); break;
    case '/':
        if ($b == 0) echo "Cannot divide by zero";
        else echo "$a / $b = " . ($a / $b);
        break;
    default: echo "Invalid operation";
}
?>`},
 {t:"التقدير بـ switch(true)",lvl:"Lab 3",tags:["vars","switch"],
  q:"حل سؤال تقدير الطالب (A إلى F) لكن باستخدام switch بدل if. وتأكد أن الدرجة بين 0 و100.",
  h:"switch (true) وكل case فيه شرط مثل ($mark >= 90).",
  s:`<?php
$mark = 77;
switch (true) {
    case ($mark < 0 || $mark > 100): echo "Invalid mark"; break;
    case ($mark >= 90): echo "A"; break;
    case ($mark >= 80): echo "B"; break;
    case ($mark >= 70): echo "C"; break;
    case ($mark >= 60): echo "D"; break;
    default: echo "F";
}
?>`},
 {t:"جدول الضرب",lvl:"Lab 4",tags:["vars","for"],
  q:"اطبع جدول ضرب العدد 7 من 1 إلى 10 بهذا الشكل: 7 x 1 = 7",
  h:"عدد التكرار معروف (10) = for.",
  s:`<?php
$n = 7;
for ($i = 1; $i <= 10; $i++) {
    echo "$n x $i = " . ($n * $i) . "<br>";
}
?>`},
 {t:"مجموع الأعداد الفردية",lvl:"Lab 4",tags:["vars","for","if"],
  q:"احسب مجموع الأعداد الفردية من 1 إلى n حيث n = 15، واطبع الأعداد ثم المجموع.",
  h:"for من 1 إلى n، وداخلها if ($i % 2 != 0). أو ابدأ من 1 وزد 2 كل مرة بدون if.",
  s:`<?php
$n = 15; $sum = 0;
for ($i = 1; $i <= $n; $i++) {
    if ($i % 2 != 0) {
        echo $i . " ";
        $sum += $i;
    }
}
echo "<br>Sum = $sum";     // 64
?>`},
 {t:"العد التنازلي",lvl:"Lab 4",tags:["vars","while"],
  q:"اطبع الأعداد من 20 إلى 1 تنازلياً باستخدام while، وفي النهاية اطبع: Done",
  h:"ابدأ المتغير من 20 وأنقصه بـ -- داخل الحلقة.",
  s:`<?php
$i = 20;
while ($i >= 1) {
    echo $i . " ";
    $i--;
}
echo "<br>Done";
?>`},
 {t:"عدد أرقام العدد",lvl:"Lab 4",tags:["vars","while"],
  q:"عندك عدد مثل 58213. احسب كم رقم فيه (الناتج 5) باستخدام while بدون دوال جاهزة.",
  h:"طالما العدد أكبر من 0: اقسمه قسمة صحيحة على 10 وزد العداد.",
  s:`<?php
$num = 58213; $count = 0;
while ($num > 0) {
    $num = intdiv($num, 10);
    $count++;
}
echo "Digits = $count";
?>`},
 {t:"عكس العدد",lvl:"Lab 4",tags:["vars","math","while"],
  q:"اعكس العدد 1234 ليصبح 4321 واطبعه.",
  h:"آخر رقم = % 10. الناتج = الناتج × 10 + آخر رقم. ثم احذف آخر رقم بالقسمة الصحيحة على 10.",
  s:`<?php
$num = 1234; $rev = 0;
while ($num > 0) {
    $digit = $num % 10;
    $rev = $rev * 10 + $digit;
    $num = intdiv($num, 10);
}
echo $rev;    // 4321
?>`},
 {t:"مجموع حتى يتجاوز 100",lvl:"Lab 4",tags:["vars","do"],
  q:"اجمع الأعداد 1 + 2 + 3 + ... وتوقف أول ما يصير المجموع أكبر من 100. اطبع آخر عدد أضفته والمجموع. استخدم do..while.",
  h:"الشرط في do..while: استمر طالما المجموع <= 100.",
  s:`<?php
$i = 0; $sum = 0;
do {
    $i++;
    $sum += $i;
} while ($sum <= 100);
echo "Last number = $i <br> Sum = $sum";   // 14 و 105
?>`},
 {t:"المضروب مع التحقق",lvl:"Lab 4",tags:["vars","if","for"],
  q:"احسب مضروب n = 6. إذا كان n سالباً اطبع رسالة خطأ بدل الحساب.",
  h:"if للتحقق أولاً، ثم for تضرب من 1 إلى n في متغير يبدأ بـ 1 (وليس 0).",
  s:`<?php
$n = 6;
if ($n < 0) {
    echo "Factorial is not defined for negative numbers";
} else {
    $fact = 1;
    for ($i = 1; $i <= $n; $i++) $fact *= $i;
    echo "$n! = $fact";     // 720
}
?>`},
 {t:"أقساط القرض سنة بسنة",lvl:"Lab 4",tags:["vars","math","for"],
  q:"قرض 24000 ريال على 4 سنوات بدون فائدة. اطبع المتبقي من القرض في نهاية كل سنة:\nYear 1: remaining 18000\n...\nYear 4: remaining 0",
  h:"القسط السنوي = المبلغ ÷ السنوات. حلقة for على السنوات، وكل دورة تنقص القسط من المتبقي.",
  s:`<?php
$loan = 24000; $years = 4;
$yearly = $loan / $years;        // 6000
$remaining = $loan;
for ($y = 1; $y <= $years; $y++) {
    $remaining -= $yearly;
    echo "Year $y: remaining $remaining <br>";
}
?>`},
 {t:"مستطيل نجوم",lvl:"Lab 4",tags:["nested","for"],
  q:"اطبع مستطيلاً من النجوم 4 صفوف × 6 أعمدة.",
  h:"حلقة خارجية للصفوف وداخلية للأعمدة، و<br> بعد الداخلية.",
  s:`<?php
for ($r = 1; $r <= 4; $r++) {
    for ($c = 1; $c <= 6; $c++) echo "*";
    echo "<br>";
}
?>`},
 {t:"مثلث أرقام",lvl:"Lab 4",tags:["nested","for"],
  q:"اطبع الشكل التالي:\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
  h:"الداخلية تمشي من 1 إلى رقم الصف، وتطبع متغير الداخلية.",
  s:`<?php
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= $i; $j++) echo $j . " ";
    echo "<br>";
}
?>`},
 {t:"مثلث مقلوب",lvl:"Lab 4",tags:["nested","for"],
  q:"اطبع:\n*****\n****\n***\n**\n*",
  h:"الخارجية تنازلية من 5 إلى 1، والداخلية من 1 إلى رقم الصف.",
  s:`<?php
for ($i = 5; $i >= 1; $i--) {
    for ($j = 1; $j <= $i; $j++) echo "*";
    echo "<br>";
}
?>`}
];
