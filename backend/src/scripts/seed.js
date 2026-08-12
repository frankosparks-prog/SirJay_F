const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const HeroConfig = require('../models/HeroConfig');
const WhyChooseCard = require('../models/WhyChooseCard');
const FashionModule = require('../models/FashionModule');
const ComingSoonDept = require('../models/ComingSoonDept');
const Course = require('../models/Course');
const Event = require('../models/Event');
const FAQ = require('../models/FAQ');
const GalleryItem = require('../models/GalleryItem');
const Staff = require('../models/Staff');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Admin.deleteMany({});
    await HeroConfig.deleteMany({});
    await WhyChooseCard.deleteMany({});
    await FashionModule.deleteMany({});
    await ComingSoonDept.deleteMany({});
    await Course.deleteMany({});
    await Event.deleteMany({});
    await FAQ.deleteMany({});
    await GalleryItem.deleteMany({});
    await Staff.deleteMany({});

    console.log('Seeding Admin credentials...');
    await Admin.create({
      username: 'admin',
      password: 'admin123',
      email: 'sirjaysuits@gmail.com',
      role: 'admin'
    });

    console.log('Seeding Hero Config...');
    await HeroConfig.create({
      announcementBadgeText: 'Admissions Open for 2025/2026',
      announcementActive: true,
      stats: [
        { label: 'Graduated Alumni', value: '1,800', suffix: '+', iconName: 'Users' },
        { label: 'Professional Courses', value: '16', suffix: '+', iconName: 'GraduationCap' },
        { label: 'Self-Employment Rate', value: '95', suffix: '%', iconName: 'Briefcase' },
        { label: 'Practical Workshop Access', value: '100', suffix: '%', iconName: 'TrendingUp' }
      ]
    });

    console.log('Seeding Why Choose Us Cards...');
    await WhyChooseCard.create([
      {
        title: 'Modern Studios & Workshops',
        description: 'Train with industrial electric sewing machines, heavy-duty pattern tables, and Adobe Creative Cloud labs designed to simulate commercial production houses.',
        tag: 'State-of-the-Art',
        iconName: 'Scissors',
        image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Entrepreneurship Mentorship',
        description: 'Learn how to monetize your creative talent. We cover business registration, brand building, pricing strategy, client relations, and boutique launching.',
        tag: 'Market-Ready',
        iconName: 'Briefcase',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Affordable & Flexible Installments',
        description: 'Quality vocational education made accessible with monthly fee payment structures, flexible day/evening/weekend classes, and merit scholarships.',
        tag: 'Flexible',
        iconName: 'Award',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
      }
    ]);

    console.log('Seeding Fashion Modules...');
    await FashionModule.create([
      { title: 'Beginner Level', level: 'Beginner Level', duration: '3 Months', desc: 'Machine setup, straight stitching, body measurements, and basic pattern drafting.', order: 1 },
      { title: 'Intermediate Level', level: 'Intermediate Level', duration: '3 Months', desc: 'Garment drafting, collar & sleeve techniques, zipper insertions, and precision fitting.', order: 2 },
      { title: 'Expert Level', level: 'Expert Level', duration: '3 Months', desc: 'Bespoke tailoring, blazer construction, couture gowns, and embroidery embellishments.', order: 3 },
      { title: 'Professional Level', level: 'Professional Level', duration: '3 Months', desc: 'Collection drafting, fashion illustration, brand identity, and fashion business law.', order: 4 }
    ]);

    console.log('Seeding Coming Soon Departments...');
    await ComingSoonDept.create([
      { name: 'Cosmetology & Beauty', desc: 'Skincare, hair design, spa & aesthetic therapies.', iconName: 'Palette', status: 'Registration Opening Soon' },
      { name: 'Deejay School', desc: 'Digital mixing, sound engineering & live performance.', iconName: 'Music', status: 'Registration Opening Soon' },
      { name: 'Modeling School', desc: 'Runway poise, commercial photography & portfolio build.', iconName: 'Camera', status: 'Registration Opening Soon' },
      { name: 'Hospitality Courses', desc: 'Customer care, event catering & front office operations.', iconName: 'Coffee', status: 'Registration Opening Soon' }
    ]);

    console.log('Seeding Sample Courses...');
    await Course.create([
      {
        title: 'School of Fashion Design - Professional Diploma Track',
        category: 'fashion',
        level: 'Diploma / Certificate',
        duration: '1 Year (4 Modules x 3 Months)',
        fees: 'KES 22,000 / Term',
        image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop',
        description: 'Comprehensive 12-unit curriculum covering pattern drafting, croquis sketching, suit tailoring, couture gown construction, CAD illustration, and fashion business law.'
      },
      {
        title: 'Artisan Level 3 Garment Making & Tailoring',
        category: 'fashion',
        level: 'NITA & TVETA Level 3 Artisan',
        duration: '6 Months',
        fees: 'KES 18,500 / Term',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
        description: 'Hands-on practical workshop training focused on industrial machine sewing, overlock finishing, trouser and skirt assembly, and alterings.'
      },
      {
        title: 'Graphic Design & Fashion Vector Illustration',
        category: 'ict',
        level: 'Craft Certificate',
        duration: '3 Months',
        fees: 'KES 15,000 / Term',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
        description: 'Master Photoshop, Illustrator, and digital croquis design tools to generate technical flat spec sheets, brand logos, and digital mood boards.'
      }
    ]);

    console.log('Seeding Events...');
    await Event.create([
      {
        title: 'Sir Jay Nanyuki Fashion Showcase',
        date: 'April 28, 2025',
        time: '2:00 PM - 6:00 PM',
        location: 'Sir Jay Main Auditorium, Nanyuki',
        category: 'Exhibition',
        badge: 'Featured Event',
        description: 'Graduating students displaying bespoke suit collections, evening gowns, and contemporary African wear to employers, fashion enthusiasts, and local media.'
      },
      {
        title: 'Graphic Design Bootcamp for Beginners',
        date: 'May 5, 2025',
        time: '9:00 AM - 1:00 PM',
        location: 'ICT & Media Lab, Nanyuki Campus',
        category: 'Free Workshop',
        badge: 'Practical Bootcamp',
        description: 'A free 1-day practical workshop on Photoshop basics, croquis vector drawing, and logo design for aspiring fashion and media designers.'
      }
    ]);

    console.log('Seeding FAQs...');
    await FAQ.create([
      { question: 'When is the next intake?', answer: 'Our major intakes occur in January, May, and September, with ongoing rolling admissions for fashion workshops.', order: 1 },
      { question: 'What courses are offered?', answer: 'Sir Jay School of Fashion Design (Beginner to Professional), Trade Test Artisan Level 3, Level 4 Cert, Level 5 Craft, and Level 6 Diploma.', order: 2 },
      { question: 'Where is the Nanyuki campus?', answer: 'Hospital Road, Off Nyeri-Nanyuki Highway, near Cedar Mall Area in Nanyuki Town.', order: 3 },
      { question: 'What are the learning schedules?', answer: 'Day Classes (9am-5pm), Evening Classes (5:30pm-8pm), and Saturday Weekend Classes (10am-3pm).', order: 4 }
    ]);

    console.log('Seeding Gallery Items...');
    await GalleryItem.create([
      {
        title: 'Haute Couture Pattern Drafting',
        category: 'Fashion Design',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
        desc: 'Level 5 Craft students mastering precision flat-pattern technique and bodice construction in Studio A.',
        tags: ['Pattern Drafting', 'Level 5 Craft', 'Studio A'],
        isCircularGallery: true
      },
      {
        title: 'Campus Innovation Tour 2025',
        category: 'Videos',
        type: 'video',
        src: '/SirJay.mp4',
        poster: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
        desc: 'Behind-the-scenes look at TVETA-certified practical learning environment at Sir Jay Nanyuki Campus.',
        tags: ['Campus Video', 'TVETA Certified', 'Nanyuki'],
        isFacilityTour: true
      },
      {
        title: 'Digital Illustration & CAD Suite',
        category: 'ICT & Tech',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop',
        desc: 'High-spec computer lab equipped with Adobe Creative Cloud and Clo3D garment simulation software.',
        tags: ['Fashion CAD', 'ICT Lab', 'Digital Arts'],
        isCircularGallery: true
      }
    ]);

    console.log('Seeding Institutional Staff...');
    await Staff.create([
      {
        name: 'Sir Jay (Jay Sartorial)',
        role: 'Founder & Managing Director',
        department: 'Executive Directorate',
        bio: 'Visionary fashion designer, master tailor, and entrepreneur who established Sir Jay Training Institute to empower East African youth with world-class suiting and garment manufacturing skills.',
        qualifications: 'Master Bespoke Suiter • Higher Diploma Fashion Technology',
        email: 'sirjaysuits@gmail.com',
        phone: '+254 719 185 821',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        hierarchyOrder: 1,
        isLeadership: true
      },
      {
        name: 'Dr. Elizabeth Mwangi',
        role: 'Academic Registrar & Quality Assurance Head',
        department: 'Academic Registry',
        bio: 'Oversees TVETA curriculum compliance, NITA test center accreditation, examination standards, and student progression pathways across all academic departments.',
        qualifications: 'Ph.D. Education Management • M.Ed. Curriculum Studies',
        email: 'registrar@sirjayinstitute.ac.ke',
        phone: '+254 722 000 111',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        hierarchyOrder: 2,
        isLeadership: true
      },
      {
        name: 'Master Tailor Peter Kinyua',
        role: 'Head of Department - School of Fashion Design',
        department: 'School of Fashion Design',
        bio: 'Over 18 years of experience in haute couture tailoring, luxury blazer construction, industrial sewing machinery, and advanced pattern drafting.',
        qualifications: 'Higher Diploma Fashion Design (KNQF Level 6) • NITA Assessor',
        email: 'fashion@sirjayinstitute.ac.ke',
        phone: '+254 712 345 678',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
        hierarchyOrder: 3,
        isLeadership: true
      },
      {
        name: 'Grace Wambui',
        role: 'Senior Instructor - Pattern Drafting & Draping',
        department: 'School of Fashion Design',
        bio: 'Specializes in 2D flat block manipulation, evening gown draping, textile care, and student collection mentoring.',
        qualifications: 'Diploma Fashion Design & Technology',
        email: 'grace.w@sirjayinstitute.ac.ke',
        phone: '+254 723 456 789',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
        hierarchyOrder: 4,
        isLeadership: false
      },
      {
        name: 'Eng. David Ochieng',
        role: 'ICT & Digital Media Lead',
        department: 'ICT & Technical Department',
        bio: 'Leads digital fashion illustration (Clo3D/Adobe CAD), computer literacy programs, and technical infrastructure at Nanyuki Campus.',
        qualifications: 'B.Sc. Computer Science • Adobe Certified Professional',
        email: 'ict@sirjayinstitute.ac.ke',
        phone: '+254 734 567 890',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
        hierarchyOrder: 5,
        isLeadership: false
      }
    ]);

    console.log('Seeding complete! Admin created with username: "admin" and password: "admin123"');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
