import Image from "next/image";

import { APK_LINK } from "@/constants";

import styles from "./styles.module.css";

const Page = () => {
  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>
          24/7 dəstəklənən <span>AZPULMAT</span> tətbiqinin ən son versiyasını
          quraşdırmadan əvvəl sizə lazımdır:
        </h1>
        <ul className={styles["list-1"]}>
          <li>
            <Image
              src="/images/download-app/icon-1.webp"
              width={100}
              height={100}
              quality={100}
              alt=""
            />
            <p>1. Mobil tətbiqinin köhnə versiyasını cihazınızdan silin.</p>
          </li>
          <li>
            <Image
              src="/images/download-app/icon-2.webp"
              width={100}
              height={100}
              quality={100}
              alt=""
            />
            <p>2. Cihazınızda ən azı 100 MB boş yaddaş olduğuna əmin olun.</p>
          </li>
          <li>
            <Image
              src="/images/download-app/icon-3.webp"
              width={100}
              height={100}
              quality={100}
              alt=""
            />
            <p>
              3. Xahiş edirik, aşağıdakı quraşdırma təlimatlarını diqqətlə
              oxuyun. Google Play-dən mobil tətbiqinin quraşdırılması prosesi
              saytdan mobil tətbiqinin quraşdırılması prosesindən fərqlidir.
            </p>
          </li>
          <li>
            <Image
              src="/images/download-app/icon-4.webp"
              width={100}
              height={100}
              quality={100}
              alt=""
            />
            <p>
              4. «Faylı yüklə» düyməsini basaraq quraşdırma faylını yükləyin və
              aşağıdakı təlimatlara uyğun olaraq tətbiqi quraşdırın.
            </p>
          </li>
        </ul>

        <div className={styles["warning-wrapper"]}>
          <Image
            src="/images/download-app/warning-icon.webp"
            width={56}
            height={51}
            quality={100}
            alt=""
          />
          <p>
            Başqa saytlardan proqram təminatı quraşdırmayın. Şəbəkədə çoxlu
            saxta AZPULMAT tətbiqləri var. Yalnız rəsmi saytımızdan quraşdırın.
          </p>
        </div>

        <ul className={styles["list-2"]}>
          <li>
            <div>
              <span className={styles["number"]}>1</span>
              <h2>
                <span>Azpulmat.apk</span> quraşdırma faylını smartfonunuza
                yükləyin
              </h2>
              <a className={styles["apk-link"]} href={APK_LINK}>
                Faylı yükləmək
              </a>
            </div>
            <Image
              src="/images/download-app/app-qr.webp"
              width={243}
              height={243}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>2</span>
              <h2>
                <span>Azpulmat.apk</span> quraşdırma faylını smartfonunuza
                yükləyin
              </h2>
              <p>
                Çox güman ki, smartfonunuz Azpulmat.apk faylının yüklənməsinin
                təhlükəli olduğu barədə sizə xəbərdlıq edəcək, çünki o azpul.az
                saytını xarici mənbə kimi qəbul edir. Narahat olmayın –
                Azpulmat.apk faylı smartfonunuz üçün təhlükəsizdir. Azpulmat
                layihəsi Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi dəstəyi ilə
                hazırlanıb. Platformadakı bütün tətbiqlər fərdi yoxlanışdan
                keçirilir və əlavə olaraq Kaspersky vasitəsi ilə yoxlanılır.
              </p>
              <Image
                src="/images/download-app/kaspersky.webp"
                width={177}
                height={35}
                quality={100}
                alt=""
              />
            </div>
            <Image
              src="/images/download-app/phone-1.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>3</span>
              <h2>
                <span>Azpulmat.apk</span> hara yükləndiyini tapın
              </h2>
              <ul className={styles["inner-list-1"]}>
                <li>
                  <Image
                    src="/images/download-app/icon-8.webp"
                    width={80}
                    height={80}
                    quality={100}
                    alt=""
                  />
                  <div>
                    <h3>Files</h3>
                    <p>
                      Bəzi smartfonlarda Androidlərdə yüklənən faylı «Files»
                      tətbiqində tapmaq olar
                    </p>
                  </div>
                </li>
                <li>
                  <Image
                    src="/images/download-app/icon-9.webp"
                    width={80}
                    height={80}
                    quality={100}
                    alt=""
                  />
                  <div>
                    <h3>My Files</h3>
                    <p>
                      Samsung telefonlarında onları «Mənim fayllarım» tətbiqində
                      tapmaq olar (standart «Samsung» qovluğunda yerləşir)
                    </p>
                  </div>
                </li>
                <li>
                  <Image
                    src="/images/download-app/icon-10.webp"
                    width={80}
                    height={80}
                    quality={100}
                    alt=""
                  />
                  <div>
                    <h3>Fayl idarəçisi</h3>
                    <p>Xiaomi telefonlarında «Fayl idarəçisi» adlanır</p>
                  </div>
                </li>
              </ul>
            </div>
            <Image
              src="/images/download-app/phone-2.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>4</span>
              <h2>
                Quraşdırmanı təstiqləmək üçün <span>«Quraşdırmaq»-a basın</span>
              </h2>
              <p>
                Tətbiqin yüklənməsi tez və asandır. Sadəcə «Quraşdırmaq»
                düyməsinə basıb, ekrandakı təlimatlara əməl edin. Bütün
                funksiyalara tam giriş əldə etmək və tətbiqin təklif etdiyi
                üstünlüklərdən istifadə etmək və başlamaq üçün sizə bir neçə
                dəqiqə lazım olacaq
              </p>
            </div>
            <Image
              src="/images/download-app/phone-3.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>5</span>
              <h2>
                <span>Əgər smartfon quraşdırmanı bloklayıbsa,</span> ayarlara
                daxil olub məhdudlaşdırılmış tənzimləmələrə icazə verin
              </h2>
              <p>Və ya özünüz tapın</p>
              <ul className={styles["inner-list-2"]}>
                <li>«Ayarlara» daxil olun</li>
                <li>
                  «Tətbiqlər» bölməsinə keçid alın (və ya «Tətbiqlər və ya
                  bildirişlər»)
                </li>
                <li>
                  Azpulmat.apk uyğulamasını açdığınız proqramı tapın və onun
                  parametrləri olan ekrana keçin. (3-cü bəndə baxın)
                </li>
                <li>«Əlavə tənzimləmələr» bölməsinə daxil olun</li>
                <li>«Məhdudlaşdırılmış tənzimləmələrə icazə verin» açın</li>
              </ul>
            </div>
            <Image
              src="/images/download-app/phone-4.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>6</span>
              <h2>
                <span>Ayarlardan sonra tətbiqin</span> quraşdırılmasını yenidən
                işə salın
              </h2>
              <p>Quraşdırma tamamlandıqdan sonra müvafiq bildiriş görünəcək</p>
            </div>
            <Image
              src="/images/download-app/phone-5.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
          <li>
            <div>
              <span className={styles["number"]}>7</span>
              <h2>
                <span>Hazırdır!</span> Tətbiqi işə salın və istifadə edin
              </h2>
              <p>
                Tətbiq quraşdırıldıqdan sonra Azpulmat tətbiqi smartfonunuzun
                «Ana ekranında» əks olunacaq və tətbiqdən istifadə edə
                biləcəksiniz
              </p>
            </div>
            <Image
              src="/images/download-app/phone-6.webp"
              width={306}
              height={639}
              quality={100}
              alt=""
            />
          </li>
        </ul>

        <div>
          <h2 className={styles["subtitle"]}>
            <span>Azpulmat</span> mobil tətbiqi vasitəsi ilə krediti necə əldə
            etmək olar?
          </h2>
          <ul className={styles["list-3"]}>
            <li>
              <Image
                src="/images/download-app/icon-5.webp"
                width={80}
                height={100}
                quality={100}
                alt=""
              />
              <h3>Selfie edin</h3>
              <p>Üzünüz aydın görünməlidir</p>
            </li>
            <li>
              <Image
                src="/images/download-app/icon-6.webp"
                width={164}
                height={108}
                quality={100}
                alt=""
              />
              <h3>Şəxsiyyət vəsiqənizin şəkilini çəkin</h3>
              <p>Şəxsiyyət vəsiqənizi çərçivəyə yerləşdirib şəkilini çəkin</p>
            </li>
            <li>
              <Image
                src="/images/download-app/icon-7.webp"
                width={124}
                height={124}
                quality={100}
                alt=""
              />
              <h3>Pul əldə edin</h3>
              <p>
                İstənilən karta köçürtmək və ya terminallarda nağd əldə etmək
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Page;
