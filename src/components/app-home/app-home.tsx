import { Component, State, h, Env } from '@stencil/core';
import { BorderColor, TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { getAboutData, getWorkData } from '../../common/prismic';
import type { AboutDataModel, CaseStudyDataModel } from '../../common/types';
import { INIT_MS_DATA } from './app-home.consts';
import type { MsData } from './app-home.types';

const getTime = () => new Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
  timeZoneName: "short"
}).format();

const API_URLS = {
  maplesotry: `https://www.nexon.com/api/maplestory/no-auth/v1/ranking/na?type=world&id=45&reboot_index=0&page_index=1&character_name=${Env.MS_CHAR_NAME}`,
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @State() aboutData?: AboutDataModel = undefined;
  @State() workData?: Array<CaseStudyDataModel> = [];
  @State() time: string = getTime();
  @State() msData: MsData = INIT_MS_DATA;

  async setMSData() {
    fetch(API_URLS.maplesotry)
      .then(response => response.json())
      .then(data => {
        const charData = data.ranks[0];
        this.msData = {
          charImg: charData.characterImgURL,
          jobIcon: `https://nxcache.nexon.net/maplestory/img/icons/2024/icon-job-${charData.jobName.replace(/ /g, '_').toLowerCase()}.gif`,
          jobName: charData.jobName,
          level: charData.level,
          rank: charData.rank,
        }
      })
      .catch(error => console.error("MS DATA ERROR:", error));
  }

  async connectedCallback() {
    getAboutData((data: AboutDataModel) => {
      this.aboutData = data;
    });
    getWorkData((data: Array<CaseStudyDataModel>) => {
      this.workData = data;
    });

    this.setMSData();

    setInterval(() => {
      const updatedTime = getTime();
      this.time = updatedTime;
    }, 60000);
  }


  render() {
    if (!this.aboutData) {
      return (
        <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
          Getting ready...
        </app-text>
      )
    }

    return (
      <div class="home-wrapper">
        {/* left: essential info */}
        <div class="home-wrapper--section home-wrapper--section--left">
          <content-box title="me.jpg">
            <app-image src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
          </content-box>
          <content-box title="digital_footprints.docx">
            <div class="home-links-wrapper">
              {
                this.aboutData.links.map((l) => (
                  <div class="home-link-item">
                    <app-text variant={TextVariant.Title} size={TextSize.Medium}>
                      <a href={l.link} target='_blank'>
                        {l.link_name}
                      </a>
                    </app-text>
                  </div>
                ))
              }
            </div>
          </content-box>
          <content-box title="site_info.txt">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              This site was made with Stencil.js
            </app-text>
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              Su Li &copy; 2025
            </app-text>
          </content-box>
        </div>
        {/* main: details */}
        <div class="home-wrapper--section">
          <content-box title="intro.txt">
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
              <rich-text-renderer field={this.aboutData.intro_text} />
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Medium}>
              <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
            </app-text>
          </content-box>
        </div>
        {/* right: hobby/misc. */}
        <div class="home-wrapper--section">
          <content-box title="annoucement.txt">
            <app-text color={TextColor.Green} variant={TextVariant.Title} size={TextSize.Medium}>
              More detailed work info coming soon!
            </app-text>
          </content-box>
          <content-box title="my_timezone.exe">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              {this.time}
            </app-text>
          </content-box>
          <content-box title="maplestory_main.exe">
            <div class="ms-data--wrapper">
              <div class="ms-data--left">
                <app-image src={this.msData.charImg} alt="maplestory character image" />
              </div>
              <div class="ms-data--right">
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  <img src={this.msData.jobIcon} width={20} height={20} alt={`${this.msData.jobName} icon`} title={this.msData.jobName} />
                  &nbsp;in &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    Kronos
                  </app-text>&gt;
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  Rank &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    {this.msData.rank}
                  </app-text>&gt;
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  Level &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    {this.msData.level}
                  </app-text>&gt;
                </app-text>
              </div>
            </div>
          </content-box>
        </div>

      </div>
    )

    // return (
    //   <div class="home-wrapper">
    //     <div class="home-content-left">
    //       <content-box>
    //         <app-text color={TextColor.Green} variant={TextVariant.Accent} size={TextSize.Large}>
    //           <rich-text-renderer field={this.aboutData.intro_text} />
    //         </app-text>
    //         <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Medium}>
    //           <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
    //         </app-text>
    //       </content-box>
    //       <div class="home-content-left-details">
    //         <div class="home-content-left-details-content">
    //           <content-box>
    //               <div class="home-about-misc-wrapper">
    //                 <div class="home-about-misc-banner">
    //                   <app-text color={TextColor.Blue} variant={TextVariant.Accent} size={TextSize.Medium}>
    //                     THIS IS ME!
    //                   </app-text>
    //                 </div>
    //                 <img src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
    //                 <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>Still working on this site! Come back to check the final form later ✨(ㆆ◡ㆆ)✌️</app-text>
    //               </div>
    //           </content-box>
    //           <content-box title="PLACES I WORKED AT">
    //               <div class="home-list-wrapper">
    //                 {
    //                   this.aboutData.experience.map((exp) => (
    //                     <div class="home-list-item">
    //                       <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>{ exp.duration }</app-text>
    //                       <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Medium}>{ exp.org }</app-text>
    //                     </div>
    //                   ))
    //                 }
    //               </div>
    //           </content-box>
    //         </div>
    //         <div class="home-content-left-details-content">
    //           <content-box title="SOME SKILLS OF MINE">
    //               <div class="home-list-wrapper">
    //                   <div class="home-list-item">
    //                     <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Web basics</app-text>
    //                     <app-text color={TextColor.Sub} size={TextSize.Small}>{ this.aboutData.languages }</app-text>
    //                   </div>
    //                   <div class="home-list-item">
    //                     <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Frameworks & Libraries</app-text>
    //                     <app-text color={TextColor.Sub} size={TextSize.Small}>{ this.aboutData.frameworks }</app-text>
    //                   </div>
    //                   <div class="home-list-item">
    //                     <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Tools</app-text>
    //                     <app-text color={TextColor.Sub} size={TextSize.Small}>{ this.aboutData.tools }</app-text>
    //                   </div>
    //               </div>
    //           </content-box>
    //           <content-box title="MY OTHER PRESENCES">
    //               <div class="home-links-wrapper">
    //                 {
    //                   this.aboutData.links.map((l) => (
    //                     <div class="home-link-item">
    //                       <app-text color={TextColor.Green} variant={TextVariant.Accent} size={TextSize.Small}>
    //                         <a href={l.link} target='_blank'>
    //                           {l.link_name}
    //                         </a>
    //                       </app-text>
    //                     </div>
    //                   ))
    //                 }
    //               </div>
    //           </content-box>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="home-content-right">
    //       <app-text color={TextColor.Yellow} variant={TextVariant.Accent} size={TextSize.Medium}>
    //         SOME STUFF I’VE WORKED ON
    //         <div class="home-work-wrapper">
    //           {
    //             this.workData.map((w) => (
    //               <div class="home-work-item--wrapper">
    //                 <content-box>
    //                     <div class="home-work-item--content">
    //                       <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>
    //                         {w.name}
    //                       </app-text>
    //                       <div class="home-work-item--image-wrapper">
    //                         <img src={w.cover.url} alt={w.cover.alt} />
    //                       </div>
    //                     </div>
    //                     <app-text color={TextColor.Magenta} variant={TextVariant.Accent} size={TextSize.XSmall}>
    //                       {w.tags.split(",").map((t) => `#${t.replace(/ /g,"_")} `)}
    //                     </app-text>
    //                 </content-box>
    //               </div>
    //             ))
    //           }
    //         </div>
    //       </app-text>
    //     </div>
    //   </div>
    // );
  }
}
