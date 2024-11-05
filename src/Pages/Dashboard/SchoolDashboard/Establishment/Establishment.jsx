import { Link } from "react-router-dom";
import Navbar from "../../../../Shared/Navbar/Navbar"
import { useAuthContext } from "../../../../hooks/useAuthContext";

function Establishment() {
  const { user } = useAuthContext();


  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-primary-color text-center text-white py-5">
        <h1 className="font-bold text-5xl  my-3">{user?.user?.facilityName}</h1>
        <p className="font-bold text-3xl">{user?.user?.address}</p>
      </div>
      <div className="px-4 md:px-10  lg:px-28 my-6 max-w-[1440px] mx-auto">
        <button className=" btn bg-primary-color text-white">
          <span>{user?.user?.facilityName}</span> <span>{user?.user?.establishmentType}</span>
        </button>
        <div className="border bg-slate-50 my-6 p-4 rounded">
          <h1>Areas of teaching</h1>

          <div className="my-4 space-y-2">
            <Link to="/change-management">
              <button className="btn bg-primary-color text-white">
                Change Management
              </button>
            </Link>
            <Link to="/soft-skills">
              <button className="btn bg-primary-color text-white">
                Soft Skills
              </button>
            </Link>
            <Link to="/seo-referencing-web-optimization">
              <button className="btn bg-primary-color text-white">
                SEO | Referencing | Web optimization
              </button>
            </Link>
            <Link to="/marketing">
              <button className="btn bg-primary-color text-white">
                Marketing
              </button>
            </Link>
            <Link to="/industry-of-the-future">
              <button className="btn bg-primary-color text-white">
                Industry Of The Future
              </button>
            </Link>
            <Link to="/innovation-continuous-improvement">
              <button className="btn bg-primary-color text-white">
                Innovation | Continuous Improvement
              </button>
            </Link>
            <Link to="/ui-design">
              <button className="btn bg-primary-color text-white">
                UI Design
              </button>
            </Link>
            <Link to="/ux-design">
              <button className="btn bg-primary-color text-white">
                UX Design
              </button>
            </Link>
            <Link to="/e-commerce">
              <button className="btn bg-primary-color text-white">
                E-commerce
              </button>
            </Link>
            <Link to="/collective-intelligence-codesign">
              <button className="btn bg-primary-color text-white">
                Collective Intelligence | Codesign
              </button>
            </Link>
            <Link to="/management-project-management">
              <button className="btn bg-primary-color text-white">
                Management and Project Management
              </button>
            </Link>
            <Link to="/motion-design">
              <button className="btn bg-primary-color text-white">
                Motion Design
              </button>
            </Link>
            <Link to="/customer-relationship">
              <button className="btn bg-primary-color text-white">
                Customer Relationship
              </button>
            </Link>
          </div>
        </div>
        <div className="border bg-slate-50 my-6 p-4 rounded">
          <h1 className="font-bold">Presentation</h1>
          <h6 className="font-semibold">
            WIS, the [tech] school of digital expertise
          </h6>
          <p>
            Mastering digital professions today means being one step ahead of
            all the challenges: yours, those of a constantly evolving technology
            and those of the companies that await you tomorrow. And for that,
            there is no question of choosing.
          </p>
          <br />
          <h1 className="font-bold">
            For us, teaching digital expertise necessarily means learning the
            technique.
          </h1>
          <p>
            At WIS, dual skills are our strength, and they will be yours
            tomorrow to be operational. Our digital school trains strategists
            who analyze, recommend, advise and anticipate business challenges.
            Choosing the WIS digital school also means choosing proximity by
            joining one of our 13 campuses spread across the country. We support
            you in becoming experts in development, UX, data, IT, etc. to manage
            and lead large-scale digital projects tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Establishment