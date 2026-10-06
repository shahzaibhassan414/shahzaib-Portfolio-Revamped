// Client testimonials. `project` links a quote to its case study, where it is shown too.

export type Testimonial = {
  headline: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  project?: string;
};

export const testimonials: Testimonial[] = [
  {
    headline: "Turned the idea into a smooth, polished product.",
    quote:
      "He took ownership of the mobile app, handled complex features like real-time chat, location-based discovery, matching and subscriptions, and turned the idea into a smooth, polished product. His communication, problem-solving and attention to detail made a real difference throughout the project.",
    name: "Jessica Hunter",
    role: "Founder",
    company: "On Scene",
    project: "on-scene",
  },
  {
    headline: "A strong focus on quality and user experience.",
    quote:
      "Working with Shahzaib on StyleBite was a great experience. He understood the requirements well, communicated clearly, and delivered the Flutter app with a strong focus on quality and user experience.",
    name: "Shahzad Ahmad",
    role: "Owner",
    company: "StyleBite",
    project: "stylebite",
  },
  {
    headline: "Reliable, responsive and professional.",
    quote:
      "It was great working with Shahzaib. He was reliable, responsive, and handled the Flutter development professionally, delivering a smooth and well-built app.",
    name: "Nawal Kishor",
    role: "Owner",
    company: "Jatt App",
    project: "jatt-app",
  },
];

/** The quote featured on the homepage. */
export const featuredTestimonial = testimonials[0];

export const testimonialFor = (slug: string) => testimonials.find((t) => t.project === slug);
