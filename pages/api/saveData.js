import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const data = req.body;

            if (!data || !data.name || !data.email) {
                return res.status(400).json({ message: "Invalid data format" });
            }

            // Save data to JSON file
            const filePath = path.join(process.cwd(), "data", "data.json");

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Initialize file with an empty array
            }

            const fileData = fs.readFileSync(filePath, "utf-8");
            const existingData = JSON.parse(fileData);

            existingData.push(data);
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

            const transporter = nodemailer.createTransport({
                host: 'smtp.hostinger.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'k.achoyan@geeklab.am',
                    pass: '3745509XXXXachoyand8^',
                },
            });

            const mailOptions = {
                from: "k.achoyan@geeklab.am",
                to: data.email,
                subject: "Դուք կուտակել եք նոր միավորներ", // Subject line
                html:`
                    <h3>playtime.am օնլայն խանությում դուք կուտակել եք նոր միավորներ</h3>
                    <h4>Ամեն կատարած գնումից դուք կուտակում եք 100 դրամ</h4>
                    <h4>Հաջորդ պատվերի ժամանակ նույնպես ակտիվացրեք QR code-ը և հավաքեք նույն տվյալները և Ձեր կուտակած միավորներին կգումարվի նոր միավորներ</h4>
                    <p>Կայքը այս պահին չի գործում, բայց շուտով կկարողանաք նաև գնումներ կատարել կայքում</p>
                `
            };
            const mailOptions2 = {
                from: "k.achoyan@geeklab.am",
                to: 'geeklabdevelopment@gmail.com',
                subject: "Ակտիվացրել են ֆորման", // Subject line
                html:`
                    <h3>Ակտիացնամ էլ-հասցեն՝ ${data.email} </h3>
                `
            };

            await transporter.sendMail(mailOptions);
            await transporter.sendMail(mailOptions2);

            res.status(200).json({ message: "Data saved and email sent successfully!" });
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
