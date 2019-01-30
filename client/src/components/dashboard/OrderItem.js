import React from "react";

class OrderItem extends React.Component {
  render() {
    const imgsrc =
      "https://embodee.adidas.com/api2/rewrite/adidas16/is/image/adidasAG/agm?&src=ir{adidasAGRender/APP18_pn1_com_1?&obj=a/f/nvr&show&obj=a/m/bas&src=sld_pn_black&show&obj=a/s/shg&show&obj=a/o/st1_s0&show&obj=a/o/st2_t0&show&obj=a/o/log&src=sld_pn_black&show&obj=a/o/cuf&src=sld_pn_white&show&obj=a/o/pip&src=sld_pn_white&show&obj=a/o/ufr&decal&show&res=10.053222945002956&pos=0,0&src=fxg{APP18_pn1_jht_teamname?&$text=ASCENDERS&$font=roadrunner&$text_color=sld_pn_collegiate_royal_ht&$stroke_color=sld_pn_white_ht&$application=heat_transfer}&obj=a/o/cfr&decal&show&res=10.567757977621218&pos=0,0&src=fxg{APP18_pn1_jht_playernumber?&$application=heat_transfer&$text=02&$font=roadrunner&$text_color=sld_pn_collegiate_royal_ht&$stroke_color=sld_pn_white_ht}&obj=a/o/cba&decal&show&res=8.800690250215704&pos=0,0&src=fxg{APP18_pn1_jht_playernumber?&$application=heat_transfer&$text=02&$font=roadrunner&$text_color=sld_pn_collegiate_royal_ht&$stroke_color=sld_pn_white_ht}&obj=a/o/sln&decal&show&res=35.78947368421053&pos=0,0&src=fxg{APP18_pn1_jht_playernumber?&$application=heat_transfer&$text=02&$font=roadrunner&$text_color=sld_pn_collegiate_royal_ht&$stroke_color=sld_pn_white_ht}&obj=a&req=object}&resMode=sharp2&wid=75&op_usm=1.2,1,4,0";
    return (
      <div className="ui segments">
        <div className="ui segment">
          OrderName
          <br />
          OrderDate
          <br />
          Ordered By
        </div>

        <div className="ui segment">
          Items
          <table className="ui celled table">
            <thead>
              <tr>
                <th className="four wide">Article</th>
                <th className="twelve wide">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={imgsrc} alt="article" />
                </td>
                <td>xx</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrderItem;
